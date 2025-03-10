function solveQuadraticEquations(a, b, c) {
    let disc = b * b - 4 * a * c;
    if (disc < 0) {
        return 'В уравнении нет корней';
    } else if (disc === 0) {
        return 'В уравнении один корень: ' + (-b / (2 * a));
    } else {
        let root1 = (-b + Math.sqrt(disc)) / (2 * a);
        let root2 = (-b - Math.sqrt(disc)) / (2 * a);
        return 'В уравнении два корня: ' + root1 + ' и ' + root2;
    }
}

module.exports = { solveQuadraticEquations};