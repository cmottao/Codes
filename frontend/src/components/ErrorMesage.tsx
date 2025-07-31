import { useEffect, useState } from "react";

/*
The `ErrorMessage` component displays an error message with a fade-in and fade-out effect.

Props:
- `active`: A boolean indicating whether the error message should be visible.
- `message`: The text content of the error message.

Features:
- Uses the `useState` hook to manage visibility (`visible` state).
- Implements a `useEffect` hook to handle fading:
  - When `active` is `true`, the message becomes visible immediately.
  - When `active` becomes `false`, a 400ms delay is applied before hiding it.
- Applies Tailwind CSS classes for styling:
  - Red-themed error message with a border and rounded corners.
  - Smooth transition between opacity states.
- The message disappears smoothly when `active` is `false`.

*/


interface ErrorMessageProps {
  active: boolean;
  message: string;
};

function ErrorMessage({ active, message}: ErrorMessageProps){
  const [visible, setVisible] = useState<boolean>(false);


  useEffect(() => {
    if(active){
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 400);
    }
  }, [active]);

  return (
    <>
      {(visible) ? 
      (<div className={`transition-opacity duration-300 ${!active? "opacity-0" : "opacity-100"} border border-[#a94646] rounded-[8px] bg-[#fae5e5] w-[inherit] h-[35px] flex justify-center items-center px-[10px] leading-[35px]`}>
        <p className="text-[#b30000] text-[15px]">{`Error: ${message}`}</p>
      </div>)  : ''
      }

    </>
  );

}

export default ErrorMessage;