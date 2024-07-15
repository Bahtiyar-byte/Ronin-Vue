/* eslint-disable semi */
/* eslint-disable @stylistic/ts/member-delimiter-style */
// eslint-disable-next-line @typescript-eslint/quotes, @typescript-eslint/semi
import type Entity from "@/types/common/Entity";

export default interface Trade extends Entity {
  name: string;
  templates: any[];
}
