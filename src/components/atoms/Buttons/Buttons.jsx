import './_buttons.scss'

const Buttons = (props) => {
    
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#'
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)]       
        }
        return color;
    };

    const itemStyle = {
        backgroundColor: getRandomColor()
    }
    return (
        <button style={itemStyle} onClick={props.click}>{props.nom}</button>
    );
};

export default Buttons;
