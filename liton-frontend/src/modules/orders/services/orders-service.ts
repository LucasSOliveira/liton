import api from "@/config/api-config";

export async function fetchOrders(
    page: number = 1,
    limit: number = 10,
    orderBy: string = "title",
    order: "ASC" | "DESC" = "ASC",
    lang: string = "pt"
): Promise<any> {
    try {
        const query = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            orderBy,
            order,
            lang: lang === "pt-BR" ? "pt" : lang,
        });

        const url = `/orders?${query}`;
        const response = await api.get(url);
        return response.data;
    } catch (error: any) {

        throw error;
    }
}