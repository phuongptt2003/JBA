
import axios from "axios";
import { users } from "../data/users";
import { User } from "../models/user";
import * as tokenStorage from "../utils/token-storage";
import { Profile } from "../models/profile";
import { data } from "react-router-dom";

export const baseUrl = 'https://jbaai.onrender.com'

axios.interceptors.request.use(
  (config) => {
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      timeout: config.timeout,
    });
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export const registerUser = async (email: string, password: string, username: string, phone: string, role: string, optionEmail: string, address: string, invitationCode: string): Promise<User | null> => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    formData.append('phone', phone);
    formData.append('role', role);
    formData.append('optionEmail', optionEmail);
    formData.append('address', address);
    formData.append('invitationCode', invitationCode);

    const configurationObject = {
      method: 'post',
      url: `${baseUrl}/api/v1/auth/register`,
      data: formData,
      timeout: 15000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    console.log('Attempting registration with URL:', configurationObject.url);
    const response = await axios(configurationObject);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration error details:', error);

    throw error;
  }
};

export const loginUser = async (email: string, password: string, clientId: string): Promise<User> => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('clientId', clientId);

    const configurationObject = {
      method: 'post',
      url: `${baseUrl}/api/v1/auth/login`,
      data: formData,
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    console.log('Attempting login with URL:', configurationObject.url);
    console.log('Login data:', { email, clientId });

    const response = await axios(configurationObject);
    // Lưu accessToken và refreshToken nếu có
    const accessToken = response.data?.data?.accessToken;
    const refreshToken = response.data?.data?.refreshToken;
    if (accessToken) {
      await tokenStorage.saveToken(accessToken);
    } else {
      console.warn('No accessToken returned from login API');
    }
    if (refreshToken) {
      await tokenStorage.saveRefreshToken(refreshToken);
    } else {
      console.warn('No refreshToken returned from login API');
    }
    console.log('AccessToken: ', accessToken);
    const user = response.data?.data?.user;
    console.log('User ne:', user);
    return user;
  } catch (error) {
    console.error('Login error details:', error);
    throw error;
  }
};

export const logoutUser = async (refreshToken: string, clientId: string = 'web-app-v1'): Promise<boolean> => {
  try {
    const configurationObject = {
      method: 'post',
      url: `${baseUrl}/api/v1/auth/logout`,
      data: {
        refreshToken,
        clientId
      },
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    };

    console.log('Attempting logout with URL:', configurationObject.url);
    const response = await axios(configurationObject);

    await tokenStorage.removeRefreshToken();
    if (tokenStorage.removeToken) {
      await tokenStorage.removeToken();
    }
    console.log('Logout response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Logout error details:', error);
    throw error;
  }
};

export const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('otp', otp);

    const configurationObject = {
      method: 'post',
      url: `${baseUrl}/api/v1/auth/verify-otp-to-reset-password`,
      data: formData,
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };

    console.log('Attempting OTP verification with URL:', configurationObject.url);
    const response = await axios(configurationObject);
    console.log('OTP verification response:', response.data);
    return response.data;
  } catch (error) {
    console.error('OTP verification error details:', error);
    throw error;
  }
};

export const updatePassword = async (email: string, newPassword: string, password: string): Promise<boolean> => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('newPassword', newPassword);
  formData.append('password', password);

  const configurationObject = {
    method: 'post',
    url: `${baseUrl}/api/v1/auth/reset-password`,
    data: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios(configurationObject);
  console.log(response.data);
  return response.data;
};

export const changePassword = async (newPassword: string, oldPassword: string): Promise<boolean> => {
  const formData = new FormData();
  formData.append('newPassword', newPassword);
  formData.append('oldPassword', oldPassword);

  const token = await tokenStorage.getToken();

  const configurationObject = {
    method: 'post',
    url: `${baseUrl}/api/v1/auth/change-password`,
    data: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  };
  const response = await axios(configurationObject);
  console.log(response.data);
  return response.data;
};

export const getOTP = async (email: string): Promise<string | null> => {
  const formData = new FormData();
  formData.append('email', email);

  const configurationObject = {
    method: 'post',
    url: `${baseUrl}/api/v1/auth/resend-otp`,
    data: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };
  const response = await axios(configurationObject);
  console.log(response.data);
  return response.data;
};

export const getUsers = async (): Promise<User[]> => {
  const configurationObject = {
    method: 'get',
    url: `${baseUrl}/api/v1/profile`
  };
  const response = await axios(configurationObject);
  console.log(response.data);
  return response.data;
};

export const getProfile = async (): Promise<Profile> => {
  const token = await tokenStorage.getToken();
  const configurationObject = {
    method: 'post',
    url: `${baseUrl}/api/v1/profile`,
    headers: {
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    },
  };
  try {
    const response = await axios(configurationObject);
    console.log('Get profile response:', response.data);
    return response.data?.data?.profile;
  } catch (error) {
    console.error('Get profile error details:', error);
    throw error;
  }
};

export const updateProfile = async (data: {
  height?: number;
  weight?: number;
  age?: number;
  gender?: string;
  smokingStatus?: number;
  username?: string;
}): Promise<any> => {
  try {
    const token = await tokenStorage.getToken();
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    const configurationObject = {
      method: 'post',
      url: `${baseUrl}/api/v1/profile/update`,
      data: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    };
    console.log('Attempting update user with URL:', configurationObject.url);
    const response = await axios(configurationObject);
    console.log('Update user response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Update user error details:', error);
    throw error;
  }
};

export const switchEmailNotification = async (): Promise<any> => {
  try {
    const token = await tokenStorage.getToken();
    const configurationObject = {
      method: 'post',
      url: `${baseUrl}/api/v1/user/switch-notification`,
      data: {},
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    };
    const response = await axios(configurationObject);
    console.log('Switch email notification response:', response.data);
    return response.data;
  } catch (error) {
    const token = await tokenStorage.getToken();
    console.log('Token used for switch notification:', token);
    console.error('Switch email notification error details:', error);
    throw error;
  }
}

export const changeLanguage = async (language: string): Promise<any> => {
  try {
    const token = await tokenStorage.getToken();
    const configurationObject = {
      method: 'post',
      url: `${baseUrl}/api/v1/user/change-language`,
      data: { language },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    };
    const response = await axios(configurationObject);
    console.log('Change language response:', response.data);
  } catch (error) {
    const token = await tokenStorage.getToken();
    console.log('Token used for change language:', token);
    console.error('Change language error details:', error);
    throw error;
  }
};

export const getHealthDataByRange = async (type: string, data: string): Promise<any> => {
  try {
    const token = await tokenStorage.getToken();
    const configurationObject = {
      method: 'post',
      url: `${baseUrl}/api/v1/health-data/get-health-data-by-range`,
      data: {
        type,
        data
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    };
    const response = await axios(configurationObject);
    console.log('Get health data by range response:', response.data);
    return response.data;
  } catch (error) {
    const token = await tokenStorage.getToken();
    console.log('Token used for get health data by range:', token);
    console.error('Get health data by range error details:', error);
    throw error;
  }
};

export const createHealthData = async (healthData: string): Promise<any> => {
  try {
    const token = await tokenStorage.getToken();
    const configurationObject = {
      method: 'post',
      url: `${baseUrl}/api/v1/health-data/update`,
      data: {
        healthData: healthData,
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    };
    const response = await axios(configurationObject);
    console.log('Create health data response:', response.data);
    return response.data;
  } catch (error) {
    const token = await tokenStorage.getToken();
    console.log('Token used for create health data:', token);
    console.error('Create health data error details:', error);
    throw error;
  }
};

// export const getUsers = (): User[] => {
//   return users;
// };
// export const getUser = (username: string): User | undefined => {
//   return users.find(user => user.username === username);
// };
// export const updatePassword = async (email: string, newPassword: string): Promise<boolean> => {
//   const userIndex = users.findIndex(user => user.Email === email);
//   if (userIndex !== -1) {
//     users[userIndex] = { ...users[userIndex], Password: newPassword };
//     console.log('Password updated for user:', email);
//     console.log('New password:', newPassword);
//     console.log('Updated user data:', JSON.stringify(users[userIndex], null, 2));
//     return true;
//   }
//   console.log('User not found for email:', email);
//   return false;
// };
// export const updateUser = (username: string, updatedData: Partial<User>): boolean => {
//   const index = users.findIndex(user => user.username === username);
//   if (index !== -1) {
//     users[index] = { ...users[index], ...updatedData };
//     return true;
//   }
//   return false;
// };
// export const loginUser = async (email: string, password: string): Promise<User | null> => {
//     console.log('Attempting login with:', email, password);
//     const user = users.find(u => u.Email === email && u.Password === password);
//     console.log('Login result:', user ? 'Success' : 'Failed');
//     return user || null;
// };
// export const registerUser = (newUser: User): boolean => {
//     const existingUser = users.find(user => user.Email === newUser.Email || user.Username === newUser.Username);
//     if (existingUser) {
//         return false; 
//     }
//     users.push(newUser);
//     return true;
// }
