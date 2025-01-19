export const customer = {
    name: "customer",
    type: "document",
    title: "Customer",
    fields: [
      {
        name: "customerId",
        type: "string",
        title: "Customer ID",
        validation: (Rule: any) => Rule.required().error("Customer ID is required."),
      },
      {
        name: "name",
        type: "string",
        title: "Customer Name",
        validation: (Rule: any) =>
          Rule.required()
            .min(2)
            .error("Customer name must be at least 2 characters long."),
      },
      {
        name: "email",
        type: "string",
        title: "Email Address",
        validation: (Rule: any) =>
          Rule.required()
            .email()
            .error("Please provide a valid email address."),
      },
      {
        name: "password",
        type: "string",
        title: "Hashed Password",
        hidden: true, // Hide this field in Sanity Studio for security reasons
        description: "Stores the hashed password of the user.",
        validation: (Rule: any) => Rule.required().error("Password is required."),
      },
      {
        name: "contact",
        type: "string",
        title: "Contact Number",
        validation: (Rule: any) =>
          Rule.required()
            .min(10)
            .max(15)
            .error("Contact number must be between 10 and 15 characters."),
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
        validation: (Rule: any) => Rule.required().error("Address is required."),
      },
    ],
  };
  