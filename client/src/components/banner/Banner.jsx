import { Typography , Box , styled} from '@mui/material'


const Image = styled(Box)`
background: url(home.jpg) center/55% no-repeat #000;
background-size: cover;
width: 100%;
height: 60vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
color: black;
`
const Heading = styled(Typography)`
font-size: 70px;
line-height: 1;
font-weight: bold;
color:white;
`

const SubHeading = styled(Typography)`
  font-size: 25px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px 16px;
  border-radius: 12px;
  color: #000;
  margin-top : 10px
`;

export function Banner() {
  return (
    <Image>
        <Heading>Travel Blogs</Heading>
        <SubHeading>Explore. Dream. Discover.</SubHeading>
    </Image>
  )
}

