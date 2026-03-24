import { request } from "./apiClient";

const customerApi = {
  /**
   * 1. Lấy danh sách món ăn phân theo danh mục
   * @returns {Promise<Array>} Danh sách sản phẩm kèm image_url, price, category...
   */
  getMenu: () => {
    return request("/menu.php");
  },

  /**
   * 2. Gửi giỏ hàng xuống bếp (Submit Order)
   * @param {Object} orderData { table_id: "A1", items: [{product_id: 1, quantity: 2}, ...] }
   */
  submitOrder: (orderData) => {
    return request("/orders_submit.php", {
      method: "POST",
      body: orderData,
    });
  },

  /**
   * 3. Xem danh sách món đã gọi và trạng thái (Waiting, Cooking, Served)
   * @param {string} tableId "A1"
   */
  getMyOrders: (tableId, token) => {
    return request(`/orders_my_order.php?TableID=${tableId}&token=${encodeURIComponent(token)}`);
  },

  /**
   * 4. Gửi yêu cầu dịch vụ (Thêm nước, lấy đá, gọi nhân viên)
   * @param {Object} serviceRequest { table_id: "A1", type: "Thêm đá" }
   */
  callService: (serviceRequest) => {
    return request("/orders_call_service.php", {
      method: "POST",
      body: serviceRequest,
    });
  },

  /**
   * 5. Lưu đánh giá nhà hàng sau khi ăn xong
   * @param {Object} feedback { order_id: 123, rating: 5, comment: "Rất ngon" }
   */
  sendFeedback: (feedback) => {
    return request("/feedback.php", {
      method: "POST",
      body: feedback,
    });
  },

  /**
   * 6. Tính toán tạm tính trước khi thanh toán
   */
  checkoutPreview: (tableId, token) => {
    return request(
      `/checkout_calculate.php?table_id=${tableId}&token=${encodeURIComponent(
        token,
      )}`,
    );
  },

  /**
   * 7. Xác nhận thanh toán
   */
  checkoutConfirm: (payload) => {
    return request("/checkout_confirm.php", {
      method: "POST",
      body: payload,
    });
  },

  /**
   * 8. Kiểm tra trạng thái token
   */
  checkToken: (tableId, token) => {
    return request(
      `/check_token.php?table_id=${tableId}&token=${encodeURIComponent(token)}`,
    );
  },
};

export default customerApi;
