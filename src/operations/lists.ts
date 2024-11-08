export function matchLists(list1: unknown[], list2: unknown[]) {
    return list1.every((item) => list2.includes(item))
}