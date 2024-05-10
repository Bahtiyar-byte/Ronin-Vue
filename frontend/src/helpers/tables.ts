import TableHeader from "@/types/table/TableHeader";


export function headerExists(headerValue: string, headers: TableHeader[]): boolean
{
    return headers.some(header => header.value === headerValue);
}
