import axios from "axios";
import Toast from "@/components/Toast"

const baseUrl = import.meta.env.VITE_API_URL;

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

    const url = `${baseUrl}/books?${query}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    Toast({ message: error, type: "error" });

    throw error;
  }
}