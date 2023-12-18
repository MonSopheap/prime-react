
const RandomColor = () => {
    const colors = "#" + Math.floor(Math.random() * (256 * 256 * 256).toString(16));
    return colors;
};
export default RandomColor;