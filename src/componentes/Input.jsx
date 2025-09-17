import { forwardRef } from "react";

import InputLabel from "./InputLabel";

// Uncontrolled-friendly Input: forwards ref to the native input element and
// accepts `defaultValue` instead of `value`/`onChange`.
const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        ref={ref}
        // use defaultValue for uncontrolled usage; allow the caller to pass it
        defaultValue={rest.defaultValue}
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]"
        {...rest}
      />
      {errorMessage && (
        <p className="text-left text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
