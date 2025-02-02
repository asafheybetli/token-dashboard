import { FC } from "react"
import Card from "../../../components/Card"
import { Label3 } from "../../../components/Typography"
import { Divider } from "../../../components/Divider"
import { BoxProps } from "@chakra-ui/react"

const CardTemplate: FC<{ title: string | JSX.Element } & BoxProps> = ({
  title,
  children,
  ...boxProps
}) => {
  return (
    <Card h="100%" w="100%" {...boxProps}>
      {typeof title === "string" ? (
        <Label3 textDecoration="uppercase">{title}</Label3>
      ) : (
        title
      )}
      <Divider borderColor="gray.300" />
      {children}
    </Card>
  )
}

export default CardTemplate
