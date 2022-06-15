import { useRef } from "react";
import { products } from "../lib/products"
import NumberInput from "./NumberInput";


export default function Products({ submitTarget, enabled }) {
  const formRef = useRef(null);

  return (
    <form method='get' action={submitTarget} ref={formRef}>
      <div className='flex flex-col gap-16'>
        <div className="grid grid-cols-2 gap-8">
          <NumberInput name="total" formRef={formRef} />
        </div>

        <button
          className="items-center px-20 rounded-md py-2 max-w-fit self-center bg-gray-900 text-white hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!enabled}
        >
          Checkout
        </button>
      </div>
    </form>
  )
}
