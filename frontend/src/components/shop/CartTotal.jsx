import { useAuth } from "../../auth/AuthToken";
import Title from "./Title";

const CartTotal = () => {
    const { currency, getCartAmount, delivery_fee } = useAuth();

    const cartAmount = getCartAmount(); // Store the cart total

    return (
        <div className="w-full">
            <div className="text-2xl">
                <Title text1={'TOTAL'} text2={'AMOUNT'} />
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}{cartAmount}.00</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Shipping fee</p>
                    <p>{currency}{delivery_fee}.00</p>
                </div>
                <div className="flex justify-between">
                    <b>Total</b>
                    <b>{currency}{cartAmount === 0 ? 0 : cartAmount + delivery_fee}.00</b>
                </div>
            </div>
        </div>
    );
}

export default CartTotal;
