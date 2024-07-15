import type Entity from "@/types/common/Entity";

export default interface Trade extends Entity {
  name: string;
  templates: any[];
}
