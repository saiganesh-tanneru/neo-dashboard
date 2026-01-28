import React, { memo } from 'react'
import { SORT_OPTIONS } from '../app-constants'
import './sort-dropdown.module.scss'
import { SortBy } from '../../models/neoModel'

export type SortOption = {
    value: string
    label: string
}

type Props = {
    options?: SortOption[]
    value?: SortBy 
    onSelect?: (value: string) => void
    className?: string
}

const SortDropdown: React.FC<Props> = ({
    options = SORT_OPTIONS,
    value,
    onSelect,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect?.(e.target.value)
    }

    return (
        <div style={{
            display: 'flex'
        }}>
            <p>Sort:</p>
            <select
                className="sort-select"
                value={value}
                onChange={handleChange}
                aria-label="Sort options"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default memo(SortDropdown)