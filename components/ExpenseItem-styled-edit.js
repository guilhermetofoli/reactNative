// Importa React e o hook useState para controle de estado
import React, { useState} from 'react';

// Importa os componentes nativos para construição de interface
import{
    View, // Container de Layout
    TextInput, // Campo de entrada de texto
    Text, // Exibição de Texto
    TouchableOpacity, //Botão personalizavel
    FlatList, //Lista de rolagem eficiente
    StyleSheet, //Estilização
    Alert //Exibição de alertas
} from 'react-native';

export default function HomeScreen(){
    //Estado para os campos de formulario
    const [descricao, setDescricao] = useState("");     //Descrição do gasto
    const [valor, setValor] = useState("");             //Valor do Gasto
    const [gastos, setGastos] = useState("");           //Lista de Gasto
    const [editandoId, setEditandoId] = useState("");   //Id do item sendo editado
    (null); //Id do Item Sendo editado

    // Função para adicionar um novo gasto ou atualizar um existente
    const adicionarOuAtualizarGasto = () =>{

        // Validação campos não podem estar vazios
        if(!descricao || !valor){
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
            
        }

        // Validação para verificar valor númerico
        if(isNaN((parseFloat(valor)))){
            Alert.alert('Erro', 'Valor deve ser numérico!');
            return;
        }

        if(editandoId){ 
            const gastosAtualizados = gastos.map((Item) => 
            // Atualiza o gasto existente com base no ID
            Item.Id === editandoId 
            ? {...Item, descricao, valor: parseFloat(valor).toFixed(2)} : Item ); // Atualiza o item com nova descrição e valor formatado
        
        setGastos(gastosAtualizados); // Atualiza a lista de gastos com o item editado
        setEditandoId(null); // Limpa o estado de edição
        } else{
            // Adiciona um novo gasto à lista
            const novoGasto = {
                id: Date.now().toString(), // Gera um ID único com base no timestamp
                descricao,                 // Descrição do gasto
                valor: parseFloat(valor).toFixed(2) // Formata o valor para 2 casas decimais
            };
            setGastos([...gastos, novoGasto]);
        }
        // Limpar os campos do formulário após adicionar ou atualizar
        setDescricao(""); // Limpa o campo de descrição
        setValor(""); // Limpa o campo de valor
    }

    // Função para remover gastos da lista
    const removerGasto = (id) => {
        setGastos(gastos.filter((Item) => Item.id !== id)); // Remove o gasto da lista com base no ID
    

    // Verifica se o item a ser removido está sendo editad. se stiver cacnela operacao
        if(editandoId === id){
            setEditandoId(null); // Cancela a edição se o item a ser removido estiver sendo editado
            setDescricao("");
            setValor(""); 
            }
    };
        

    const editarGasto = (id) => {
        setDescricao(item.descricao); // Preenche o campo de descrição com a descrição do item a ser editado
        setValor(item.valor);
        setEditandoId(id); // Define o ID do item que está sendo editado
    };

    //Cálculo do valor de gastos
    const totalGasto = gastos.reduce((acc, item) => acc + parseFloat(item.valor), 0).toFixed(2); // Soma dos valores e formata em 2 casas decimais

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Controle de Gastos</Text>

            {/*Campo para entrada da descrição*/}
            <TextInput
            style={styles.input}
            placeholder="Descrição do gasto"
            value={descricao}
            onChangeText={setDescricao}
            />


            </View>
    );

};

// Estilos aplicados a interface

const styles = StyleSheet.create({
    container: {

    },

    titulo: {

    },

    input: {

    },
    