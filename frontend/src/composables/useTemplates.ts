import type CountResponse from "@/types/common/CountRequestTypes";
import type {
  GetTemplatesRequest,
  GetTemplatesResponse,
} from "@/types/templates/GetTemplatesRequest";
import type Template from "@/types/templates/Template";
import { useApi } from "./useApi";

export const useTemplates = () => {
  const count = async (params: object) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(params as Record<string, string>);

      return `/templates/count?${qParams.toString()}`;
    });

    const { data, isFetching, error, response } = await useApi(url.value)
      .get()
      .json<CountResponse>();

    return {
      data,
      isFetching,
      error,
      response,
    };
  };

  const getList = async (requestParams: GetTemplatesRequest) => {
    const url = computed(() => {
      const qParams = new URLSearchParams(
        requestParams as Record<string, string>
      );

      return `/templates/?${qParams.toString()}`;
    });

    const { data, isFetching, error, response } = useApi(url.value)
      .get()
      .json<GetTemplatesResponse>();

    return {
      data,
      isFetching,
      error,
      response,
    };
  };

  const getById = async (id: string) => {
    const { data, isFetching, error } = useApi(`/templates/${id}`)
      .get()
      .json<Template>();

    return {
      data,
      isFetching,
      error,
    };
  };

  const create = async (template: Template) => {
    const { data, isFetching, error } = useApi("/templates/")
      .post({
        data: template,
      })
      .json<Template>();

    return {
      data,
      isFetching,
      error,
    };
  };

  const update = async (template: Template) => {
    const { data, isFetching, error } = useApi(`/templates/${template.id}`)
      .put({
        id: template.id,
        data: template,
      })
      .json<Template>();

    return {
      data,
      isFetching,
      error,
    };
  };

  const deleteTemplate = async (template: Template) => {
    const { data, isFetching, error } = useApi(`/templates/${template.id}`)
      .delete()
      .json<boolean>();

    return {
      data,
      isFetching,
      error,
    };
  };

  const autocomplete = async (query: string, limit: number = 100) => {
    const { data, isFetching } = await useApi(
      `/templates/autocomplete/?query=${query}&limit=${limit}`
    ).json<{ id: string; label: string }[]>();

    return {
      data,
      isFetching,
    };
  };

  return {
    count,
    getList,
    getById,
    create,
    update,
    deleteTemplate,
    autocomplete,
  };
};
