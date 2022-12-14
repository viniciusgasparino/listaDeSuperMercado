import Header from "../src/components/header/Header"
import Section from "../src/components/section/Section"
import Footer from "../src/components/footer/Footer"
import Form from "../src/components/form/Form"
import Input from "../src/components/input/Input"
import Button from "../src/components/button/Button"
import Card from "../src/components/card/Card"
import {FaEdit,FaRegTrashAlt} from "react-icons/fa";
import { useState } from "react"



function Home(){
  const [open,setOpen] = useState(false)
  const [id,setId] = useState(null)
  const [produto,setProduto] = useState("")
  const [marca,setMarca] = useState("")
  const [preco,setPreco] = useState(0)
  const [qtd,setQtd] = useState(0)
  const [total,setTotal] = useState(0)
  const [list,setList] = useState([])


  const handleClick = () => {
    setOpen(!open)
  }

  const handleChangeProduto = (text) => {
    setProduto(text)
  }

  const handleChangeMarca = (text) => {
    setMarca(text)
  }

  const handleChangePreco = (text) => {
    setPreco(text)
  }

  const handleChangeQtd = (text) => {
    setQtd(text)
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    setList(list.concat({_id: new Date().getMilliseconds().toString(),produto,marca,preco,qtd,total}))
    setProduto("")
    setMarca("")
    setPreco(0)
    setQtd(1)
    setTotal(0)
  }

  const handleShowUpdate = (text) => {
    setId(text._id)
    setProduto(text.produto)
    setMarca(text.marca)
    setPreco(text.preco)
    setQtd(text.qtd)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    if(!produto && !marca && !preco && !qtd) return
    setList(list.map(item=>item._id===id ? {produto,marca,preco,qtd,_id:id} : item))
    setProduto("")
    setMarca("")
    setPreco(0)
    setQtd(1)
    setTotal(0)
    setId(null)
  }

  const handleDelete = (text) => {
    setList(list.filter(item=>item._id !== text))
  }

  return(
    <>
      <Header onClick={handleClick}/>
      {
        open && (       
          <form onSubmit={id ? handleUpdate : handleCreateSubmit}>
            <Form>
              <Input
                label="produto" 
                name="name"
                type="name"
                value={produto}
                onChange={e=>handleChangeProduto(e.target.value)}
              />
              <Input
                label="Marca" 
                name="marca"
                type="name"
                value={marca}
                onChange={e=>handleChangeMarca(e.target.value)}
              />
              <Input
                label="pre??o"
                name="pre??o"
                type="number"
                placeholder="$0.00" 
                value={preco}
                onChange={e=>handleChangePreco(e.target.value)}
              />
              <Input
                label="quantidade" 
                name="quantidade"
                type="number"
                value={qtd}
                onChange={e=>handleChangeQtd(e.target.value)}
                min="1"
              />
              <Button 
                text={id ? "Atualizar" : "Enviar"}
                type="submit"
              /> 
            </Form>   
          </form>   
        )
      }
      <Section>
      { 
        list.map(item =>
          (
            <Card key={item._id}
              titulo={item.produto}
              marca={item.marca}
              preco={item.preco}
              quantidade={item.qtd}
              total={item.total = item.preco * item.qtd} 
              editar={<FaEdit 
                cursor="pointer"
                onClick={()=>handleShowUpdate(item)}
              />}
              apagar={<FaRegTrashAlt
                cursor="pointer"
                onClick={()=>handleDelete(item._id)}
              />}
            />
          )
        )
      }
      </Section>
      <Footer/>
    </>
  )
}


export default Home