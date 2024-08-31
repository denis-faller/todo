import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/themes/base/theme.css';

const DatePickerComponent = () => {
    const datepickerRef = useRef(null);

    useEffect(() => {
        $(datepickerRef.current).datepicker({
        });
    }, []);

    return (
        <input type="text" ref={datepickerRef} />
    );
};

export default DatePickerComponent;