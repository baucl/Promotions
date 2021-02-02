const { Router } = require("express");
const router = Router();
const PromotionController = require("../../controllers/promotion");

router.get("/allPromotion", PromotionController.getAllPromotion);
router.post("/createPromotion", PromotionController.createPromotion);
router.put("/updatePromotion", PromotionController.editPromotion);
router.delete("/deletePromotion/:id", PromotionController.deletePromotion);

module.exports = router;