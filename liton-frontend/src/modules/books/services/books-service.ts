import api from "@/config/api-config";
import Toast from "@/components/Toast"
export async function fetchBooks(
  search: string = "",
  page: number = 1,
  limit: number = 10,
  orderBy: string = "title",
  order: "ASC" | "DESC" = "ASC",
  lang: string = "pt"
): Promise<any> {
  try {
    const query = new URLSearchParams({
        search,
        page: String(page),
        limit: String(limit),
        orderBy,
        order,
        lang: lang === "pt-BR" ? "pt" : lang,
    });

    const url = `/books?${query}`;
    const response = await api.get(url);
    return response.data;
  } catch (error: any) {
    Toast({ message: error, type: "error" });

    throw error;
  }
}