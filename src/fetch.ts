import { toast } from "react-toastify";

type TOptions = {
  method: string;
  data: string;
};

export const fetchCustom = async (
  url: string,
  { method = "GET", data }: TOptions
) => {
  try {
    const response = await fetch(url, {
      method,
      body: JSON.stringify(data),
    });

    if (response.status === 500) {
      return toast("Something went wrong!", { type: "error" });
    }

    // Toast Success Notification
    toast("Success!", { type: "success" });
  } catch (error) {
    console.log(error);

    toast("Something went wrong!", { type: "error" });
  }
};
