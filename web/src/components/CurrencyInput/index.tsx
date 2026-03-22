import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface Props extends Omit<NumericFormatProps, 'onChange'> {
  onChange?: (event: { target: { name?: string; value: number | undefined } }) => void;
  name?: string;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, Props>(
  ({ onChange, name, ...other }, ref) => {
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange?.({ target: { name, value: values.floatValue } });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="$"
      />
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';

export default CurrencyInput;
