import { useCallback, useContext, useRef } from "react";
import { CartContext } from "../../context/cart-context";
import useRazorpay from "react-razorpay";
import "./cart.css"

const Cart = ()=> {
    const {cartData} = useContext(CartContext);
    const total = useRef();
    const RazorPay = useRazorpay();
    const razorPayDisplay = useCallback(async (total)=> {
        const options = {
            key: "rzp_test_Ig54J3cgZyppol",
            amount: total*100,
            currency: "INR",
            name: "GAMING HUB",
            description: "Gaming Transaction",
            handler: (res)=> {
                console.log(res);
            },
            prefill: {
                name: "Md Gazi Faizan",
                email: "mdgazifaizan@gmail.com",
                contact: "1234567890"
            
            },
            notes: {
                address: "work address"
            },
            theme: {
                color: "#3399cc",
            },
        }
        const rzp1 = new RazorPay(options);
        rzp1.open();
        
    }, [RazorPay])
    
    
    return (
        <>
            <section>
                <section>
                {cartData.map((cartItem)=> {
                return (
                    <article>
                        <img className="adcart" src={`http://localhost:1337${cartItem?.image?.data?.attributes?.url}`} alt=""/>
                        <article>{cartItem.title}</article>
                        <article>{cartItem.price}</article>
                        <button>Remove from cart</button>
                    </article>
                )
            })}
                </section>
                <section>
                <article>Billing Information </article>
                  {cartData.map((cart)=> {
                      
                      return <article>
                          <span>{cart.title}</span>
                          <span>{cart.price}</span>
                      </article>
                  })}
                  <article>Total: 3000</article>
                  <button onClick={()=>{razorPayDisplay(6000)}}>Checkout</button>
                </section>
            </section>
           
        </>
    )
}
export default Cart;