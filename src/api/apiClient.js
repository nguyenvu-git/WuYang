const BASE_URL = "https://wuyang.xo.je/api";

export const request = async (endpoint, options = {}) => {
  const { body, ...customConfig } = options;
  const config = {
    method: body ? "POST" : "GET",
    headers: { "Content-Type": "application/json" },
    ...customConfig,
  };

  if (body) config.body = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (response.status === 401) {
    // Logic: Redirect về trang login nếu hết phiên
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Lỗi không xác định");
  }

  return response.json();
};
