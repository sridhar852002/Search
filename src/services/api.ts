import axios from "axios";

const API_BASE_URL = "https://be-v2.convose.com";
const API_TOKEN = "Jy8RZCXvvc6pZQUu2QZ2";

export interface Interest {
  id: number;
  name: string;
  type: string;
  match: number;
  color: string;
  avatar: string | null;
  existing: boolean;
}

interface InterestResponse {
  autocomplete: Interest[];
  pages_left: number;
}

export const searchInterests = async (query: string, limit: number = 12, from: number = 0): Promise<InterestResponse> => {
  try {
    const response = await axios.get<InterestResponse>(`${API_BASE_URL}/autocomplete/interests`, {
      params: {
        q: query,
        limit,
        from,
      },
      headers: {
        Authorization: API_TOKEN,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching interests:", error);
    return { autocomplete: [], pages_left: 0 };
  }
};