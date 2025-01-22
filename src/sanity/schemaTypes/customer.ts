
export const customer = {
  name: "customer",
  type: "document",
  title: "Customer",
  fields: [
    {
      name: "customerId",
      type: "string",
      title: "Customer ID",
    },
    {
      name: "name",
      type: "string",
      title: "Customer Name",
    },
    {
      name: "email",
      type: "string",
      title: "Email Address",
    },
    {
      name: "password",
      type: "string",
      title: "Hashed Password",
      hidden: true, 
      description: "Stores the hashed password of the user.",
    },
    {
      name: "contact",
      type: "string",
      title: "Contact Number",
    },
    {
      name: "address",
      type: "object",
      title: "Address",
      fields: [
        { name: "street", type: "string", title: "Street" },
        { name: "city", type: "string", title: "City" },
        { name: "state", type: "string", title: "State" },
        { name: "postalCode", type: "string", title: "Postal Code" },
        { name: "country", type: "string", title: "Country" },
      ],
    },
  ],
};
