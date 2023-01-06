import { toast } from "../components/Toast/core/toast";

export function fetchThenToast() {
  fetch('https://dummyjson.com/products')
  .then(res => {
    return res.json();
  })
  .then((item) => {
    toast.success({title: item.products[0].description, autoClose: 3000})
  });
}

export function fetchThenFail() {
  fetch('https://dummyjson.com/productse')
  .then(res => {
    return res.json();
  })
  .then((item) => {
  })
  .catch(err => {
    toast.error({title: "Ada error guys", autoClose: 3000})
  });
}