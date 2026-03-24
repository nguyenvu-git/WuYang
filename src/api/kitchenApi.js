import { request } from "./apiClient";

const kitchenApi = {
  /**
   * Lấy danh sách OrderItems đang chờ hoặc đang nấu
   * GET /api/v1/kitchen/orders
   */
  getOrders: () => {
    return request("/kitchen_orders.php");
  },

  /**
   * Lấy danh sách món ăn đầy đủ cho bếp (kẻ cả món đã đóng)
   * GET /api/kitchen_products.php
   */
  getProducts: () => {
    return request("/kitchen_products.php");
  },

  /**
   * Cập nhật trạng thái một món
   * PATCH /api/v1/kitchen/items/:id/status
   * @param {number} itemId
   * @param {string} status - "Waiting" | "Cooking" | "Served"
   */
  updateItemStatus: (itemId, status) => {
    return request(`/kitchen_update_item_status.php?id=${itemId}`, {
      method: "PATCH",
      body: { ItemStatus: status },
    });
  },

  /**
   * Bật/tắt trạng thái món ăn
   * PATCH /api/kitchen_toggle_product.php
   * @param {number} productId
   * @param {number} isAvailable - 1: Còn món, 0: Hết món
   */
  toggleProduct: (productId, isAvailable) => {
    return request("/kitchen_toggle_product.php", {
      method: "PATCH",
      body: { ProductID: productId, IsAvailable: isAvailable },
    });
  },
};

export default kitchenApi;
