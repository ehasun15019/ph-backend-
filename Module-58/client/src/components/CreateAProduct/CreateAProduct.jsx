import React from "react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const CreateAProduct = () => {

    const {user} = useAuth();
    // const axiosInstance = useAxios();
    const axiosSecure = useAxiosSecure();

  const handleCreateProduct = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const image = e.target.image.value;
    const price_min = e.target.price_min.value;
    const price_max = e.target.price_max.value;

    console.log(title, image, price_max, price_min);

    const newProduct = { title, image, price_max, price_min, 
        email: user.email,
        seller_name: user.displayName
     };

    // axios.post("http://localhost:3000/products", newProduct).then((data) => {
    //   console.log(data.data);

    //   if (data.data.insertedId) {
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: "Your product has been created.",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   }
    // });

    axiosSecure.post('/products', newProduct)
    .then((data) => {
        console.log(data.data);
    })
  };

  return (
    <div className="lg:w-1/2 mx-auto">
      <form onSubmit={handleCreateProduct}>
        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" name="title" className="input" />

          {/* Image */}
          <label className="label">Image Url</label>
          <input type="text" className="input" name="image" />

          {/* Minimum Price */}
          <label className="label">Minimum Price</label>
          <input
            type="text"
            name="price_min"
            className="input"
            placeholder="Minimum Price"
          />

          {/* Minimum Price */}
          <label className="label">Minimum Price</label>
          <input
            type="text"
            name="price_max"
            className="input"
            placeholder="Maximum Price"
          />

          <button className="btn btn-neutral mt-4">Add a product</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateAProduct;
