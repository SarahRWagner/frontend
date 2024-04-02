import "./product.scss";
import axios from "axios";
import { baseUrl } from "../../constants/url.constants";
import { useState, useEffect } from "react";
import { IProducts } from "../../types/global.typing";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import moment from "moment";

const Products: React.FC = () => {
  const [products, setProducts] = useState<IProducts[]>([]);

  const fetchProductsList = async () => {
    try {
      const response = await axios.get<IProducts[]>(baseUrl);
      setProducts(response.data);
    } catch (error) {
      alert("An Error Happened!");
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, []);

  console.log(products);

  return (
    <div className="products">
      <h1>Product List</h1>
      {products.length === 0 ? (
        <h1>No Products Available</h1>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Brand</th>
                <th>Creation Time</th>
                <th>Update Time</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.brand}</td>
                  <td>{moment(product.createdAt).fromNow()}</td>
                  <td>{moment(product.updatedAt).fromNow()}</td>
                  <td>
                    <Button variant="outlined" color="warning" sx={{ mx: 3 }}>
                      <Edit />
                    </Button>
                    <Button variant="outlined" color="error" sx={{ mx: 3 }}>
                      <Delete />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
