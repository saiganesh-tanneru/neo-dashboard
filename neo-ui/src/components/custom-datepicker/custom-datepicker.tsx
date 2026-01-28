import React, { useState } from 'react';
import './custom-datepicker.module.scss';

interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}

export const CustomDatePicker: React.FC = () => {
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: null,
        endDate: null,
    });

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateRange({
            ...dateRange,
            startDate: e.target.value ? new Date(e.target.value) : null,
        });
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDateRange({
            ...dateRange,
            endDate: e.target.value ? new Date(e.target.value) : null,
        });
    };

    return (
        <div className="date-range-picker">
            <div className="date-input-group">
                <label htmlFor="start-date">Start Date</label>
                <input
                    id="start-date"
                    type="date"
                    value={dateRange.startDate?.toISOString().split('T')[0] || ''}
                    onChange={handleStartDateChange}
                />
            </div>
            <div className="date-input-group">
                <label htmlFor="end-date">End Date</label>
                <input
                    id="end-date"
                    type="date"
                    value={dateRange.endDate?.toISOString().split('T')[0] || ''}
                    onChange={handleEndDateChange}
                />
            </div>
        </div>
    );
};