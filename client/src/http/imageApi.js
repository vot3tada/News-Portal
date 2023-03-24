import {$authHost, $host} from "./index";


export const image = async (image) => {
    const {data} = await $host.get(image);
    return data;
}
