export type Activity = {
  _id: string;
  date: string;
  event: string;
  type: string;
  stage: number;
}

export type StageType = {
  _id: string;
  name: string;
  complete: boolean;
}

export type PropertyDetailsType = {
  address: string;
  price: string;
}