
import { Box, Button , Table , TableBody, TableRow , TableCell , TableHead , styled} from "@mui/material";
import { CategoriesData } from "../../constants/categoriesData.js";
import {Link} from "react-router-dom";

const StyledTable = styled(Table)`
  margin-top: 20px;
  border: 1px solid #ccc;
`;

const StyledTableRow = styled(TableRow)`
  &:hover {
    background-color: #f5f5f5e7;
  }
`;

const StyledTableCell = styled(TableCell)`
  font-size: 16px;
  padding: 12px;
  font-weight: 500;
`;
const StyledHeaderCell = styled(TableCell)`
  background-color: #1976d2;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

const Container = styled(Box)`
  width: 90%;
  margin: 20px auto;
`;

export const Categories = () => {
    return (
        <Container>
            <Link to={'/create'}>
            <Button  variant="contained">Create Blog</Button>
            </Link>

            <StyledTable>
                <TableHead>
                    <StyledTableRow>
                        <StyledHeaderCell>All Category</StyledHeaderCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {
                        CategoriesData.map(category => (

                            <TableRow key={category.id}>
                                <StyledTableCell>{category.name}</StyledTableCell>
                            </TableRow>
                            )
                        )
                    }
                    
                </TableBody>
            </StyledTable>

        </Container>
    )
}