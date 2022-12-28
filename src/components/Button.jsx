import React, { forwardRef,memo } from 'react';

const Button = forwardRef(({label,code,color,onClickHandler},ref) => {
  //label , id , color
    return (
        <>
            <button
                onClick={onClickHandler}
                className={`${color} rounded-full w-16 h-16 relative flex flex-col justify-center items-center cursor-pointer shadow-md`}
                ref={ref}
            >
                <p id="lap-reset-btn-label" className="text-base">
                    {label}
                </p>
                <p className="text-xs">{code}</p>
            </button>
        </>
    );
})

export default memo(Button);
