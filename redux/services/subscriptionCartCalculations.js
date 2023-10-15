export const calculateTotal = (
    subscriptionPlan,
    numOfMealsSelected,
    config,
    appliedCoupon = {},
) => {
    const validityBasedOnMeals =
        subscriptionPlan?.validityPerMeal +
        (numOfMealsSelected - subscriptionPlan?.minimunNumOfMeals);
    const discountedPrice = Math.round(
        subscriptionPlan?.pricePerMeal *
            (1 - subscriptionPlan?.appliedDiscount / 100),
    );
    const totalPlanPrice = numOfMealsSelected * discountedPrice;
    const GSTTaxes = Number(config?.GSTTaxes);
    const deliveryFee = Number(config?.deliveryFee);
    const taxableAmount = Math.round((totalPlanPrice * GSTTaxes) / 100);
    const taxedPrice = Math.round(totalPlanPrice + taxableAmount);
    let totalAmount = taxedPrice + deliveryFee;
    const couponDiscount = appliedCoupon?.discount?.value;
    const typeOfDiscount = appliedCoupon?.discount?.type;
    let discountApplied = 0;
    if (couponDiscount && typeOfDiscount) {
        if (typeOfDiscount === 'percentage') {
            discountApplied = Math.round((totalAmount * couponDiscount) / 100);
            totalAmount = totalAmount - discountApplied;
        } else if (typeOfDiscount === 'fixed') {
            discountApplied = couponDiscount;
            totalAmount = totalAmount - discountApplied;
        }
    }
    return {
        subscriptionPlan,
        numOfMealsSelected,
        validityBasedOnMeals,
        discountedPrice,
        totalPlanPrice,
        taxableAmount,
        totalAmount,
        config,
        couponDiscount: discountApplied,
        appliedCoupon,
    };
};
