// SPDX-License-Identifier: AGPL-3.0-only

import { PineArrayObject } from '../PineArrayObject';

export function get(context: any) {
    return (id: PineArrayObject, index: number) => {
        // Pine Script v6: negative indices count backwards from the end.
        // -1 = last element, -array.size() = first element.
        if (index < 0) index = id.array.length + index;
        // Bounds check: return NaN (Pine's na) for out-of-bounds access.
        // In TradingView, out-of-bounds array.get() throws a runtime error.
        // PineTS returns na instead to avoid hard crashes during development/testing.
        if (index < 0 || index >= id.array.length) {
            return NaN;
        }
        return id.array[index];
    };
}

