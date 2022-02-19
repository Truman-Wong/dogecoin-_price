
export const updateDoge = /* GraphQL */ `
  mutation UpdateDoge(
    $input: Float!
   
  ) {
    updateDoge(input: {id: "1", price: $input}) {
      id
      price
      
    }
  }
`;
