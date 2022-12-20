import gql from "graphql-tag";

export const allCharactersQuery = (
	pageNumber: number = 1,
	name: string = "",
	status: string = "",
	gender: string = ""
) => gql`
	query {
		characters (page: ${pageNumber}, filter: { name: "${name}", status: "${status}", gender: "${gender}"}) {
			info {
				count
				pages
				next
				prev
			}
			results {
				id
				name
				status
				species
				image
				gender
			}
		}
	}
`;
export const characterQuery = (id: number) => gql`
	query {
      character(id: ${id}) {
      id
      name
      status
      species
      type
      gender
      image
      created
    }
	}
`;
