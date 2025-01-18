/**
 * Κλάση για χειρισμό δισδιάστατων πινάκων.
 */
class Matrix2d {

    /**
     * Δημιουργεί έναν μηδενικό πίνακα διαστάσεων rows x cols. (Σταθερά)
     * @param {number} rows Ο αριθμός των γραμμών.
     * @param {number} cols Ο αριθμός των στηλών.
     * @returns {number[][]} Ο μηδενικός πίνακας.
     * @static
     */
    static ZERO(rows, cols) {
        if (rows < 0 || cols < 0 || !Number.isInteger(rows) || !Number.isInteger(cols)) {
            throw new Error("Οι διαστάσεις πρέπει να είναι μη αρνητικοί ακέραιοι.");
        }
        return Matrix2d.zero(rows, cols);
    }

    /**
     * Δημιουργεί έναν μοναδιαίο πίνακα διαστάσεων n x n. (Σταθερά)
     * @param {number} n Η διάσταση του πίνακα.
     * @returns {number[][]} Ο μοναδιαίος πίνακας.
     * @static
     */
    static IDENTITY(n) {
        if (n < 0 || !Number.isInteger(n)) {
            throw new Error("Η διάσταση πρέπει να είναι μη αρνητικός ακέραιος.");
        }
        return Matrix2d.identity(n);
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι ορθογώνιος.
     * @param {number[][]} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν ο πίνακας είναι ορθογώνιος, false αλλιώς.
     * @static
     */
    static isOrthogonal(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) {
            return false;
        }

        const n = matrix.length;
        const transposed = Matrix2d.transpose(matrix);
        const product = Matrix2d.mult(matrix, transposed);

        return Matrix2d.isEquals(product, Matrix2d.IDENTITY(n));
    }

    /**
     * Ελέγχει αν μια μεταβλητή είναι δισδιάστατος πίνακας.
     * @param {*} matrix Η μεταβλητή προς έλεγχο.
     * @returns {boolean} True αν είναι δισδιάστατος πίνακας, false αλλιώς.
     * @static
     */
    static isTwoDimensional(matrix) {
        return Array.isArray(matrix) && matrix.every(row => Array.isArray(row));
    }

    /**
     * Δημιουργεί ένα κλώνο ενός πίνακα.
     * @param {number[][]} matrix Ο πίνακας προς κλωνοποίηση.
     * @returns {number[][]} Ο κλώνος του πίνακα.
     * @static
     */
    static clone(matrix) {
        return matrix.map(row => [...row]);
    }

    /**
     * Εκτυπώνει έναν πίνακα στον console.
     * @param {number[][]} matrix Ο πίνακας προς εκτύπωση.
     * @static
     */
    static print(matrix) {
        console.table(matrix);
    }

    /**
     * Επιστρέφει την τιμή ενός κελιού πίνακα.
     * @param {number[][]} matrix Ο πίνακας.
     * @param {number} row Ο δείκτης της γραμμής.
     * @param {number} col Ο δείκτης της στήλης.
     * @returns {number} Η τιμή του κελιού.
     * @static
     */
    static cell(matrix, row, col) {
        if (!Matrix2d.isTwoDimensional(matrix) || row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length) {
            return undefined;//ή throw error.
        }
        return matrix[row][col];
    }

    /**
     * Επιστρέφει τον αριθμό των γραμμών ενός πίνακα.
     * @param {number[][]} matrix Ο πίνακας.
     * @returns {number} Ο αριθμός των γραμμών.
     * @static
     */
    static numberOfRows(matrix) {
        return matrix.length;
    }

    /**
     * Επιστρέφει τον αριθμό των στηλών ενός πίνακα.
     * @param {number[][]} matrix Ο πίνακας.
     * @returns {number} Ο αριθμός των στηλών.
     * @static
     */
    static numberOfCols(matrix) {
        return matrix[0] ? matrix[0].length : 0;
    }

    /**
     * Ελέγχει αν δύο πίνακες είναι ίσοι.
     * @param {number[][]} matrix1 Ο πρώτος πίνακας.
     * @param {number[][]} matrix2 Ο δεύτερος πίνακας.
     * @returns {boolean} True αν είναι ίσοι, false αλλιώς.
     * @static
     */
    static isEquals(matrix1, matrix2) {
        if (!Matrix2d.isTwoDimensional(matrix1) || !Matrix2d.isTwoDimensional(matrix2) || Matrix2d.numberOfRows(matrix1) !== Matrix2d.numberOfRows(matrix2) || Matrix2d.numberOfCols(matrix1) !== Matrix2d.numberOfCols(matrix2)) {
            return false;
        }
        for (let i = 0; i < Matrix2d.numberOfRows(matrix1); i++) {
            for (let j = 0; j < Matrix2d.numberOfCols(matrix1); j++) {
                if (matrix1[i][j] !== matrix2[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Αφαιρεί δύο πίνακες.
     * @param {number[][]} matrix1 Ο πρώτος πίνακας.
     * @param {number[][]} matrix2 Ο δεύτερος πίνακας.
     * @returns {number[][]} Η διαφορά των δύο πινάκων.
     * @static
     */
    static sub(matrix1, matrix2) {
        if (!Matrix2d.isTwoDimensional(matrix1) || !Matrix2d.isTwoDimensional(matrix2) || Matrix2d.numberOfRows(matrix1) !== Matrix2d.numberOfRows(matrix2) || Matrix2d.numberOfCols(matrix1) !== Matrix2d.numberOfCols(matrix2)) {
            throw new Error("Οι πίνακες πρέπει να έχουν τις ίδιες διαστάσεις.");
        }
        return matrix1.map((row, i) => row.map((val, j) => val - matrix2[i][j]));
    }

    /**
     * Πολλαπλασιάζει έναν πίνακα με έναν αριθμό (scalar).
     * @param {number[][]} matrix Ο πίνακας.
     * @param {number} scalar Ο αριθμός.
     * @returns {number[][]} Ο πίνακας πολλαπλασιασμένος με τον αριθμό.
     * @static
     */
    static scalarSub(matrix, scalar) {
        return matrix.map(row => row.map(val => val - scalar));
    }

    /**
     * Υπολογίζει το ίχνος ενός πίνακα (άθροισμα των διαγώνιων στοιχείων).
     * @param {number[][]} matrix Ο πίνακας.
     * @returns {number} Το ίχνος του πίνακα.
     * @static
     */
    static trace(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }
        let trace = 0;
        for (let i = 0; i < Math.min(matrix.length, matrix[0].length); i++) {
            trace += matrix[i][i];
        }
        return trace;
    }

    /**
     * Επιστρέφει τη διαγώνιο ενός πίνακα ως πίνακα μιας στήλης.
     * @param {number[][]} matrix Ο πίνακας.
     * @returns {number[]} Η διαγώνιος του πίνακα.
     * @static
     */
    static diagonal(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }
        const diagonal = [];
        for (let i = 0; i < Math.min(matrix.length, matrix[0].length); i++) {
            diagonal.push(matrix[i][i]);
        }
        return diagonal;
    }

    /**
     * Επιστρέφει τον αντίθετο πίνακα.
     * @param {number[][]} matrix Ο πίνακας.
     * @returns {number[][]} Ο αντίθετος πίνακας.
     * @static
     */
    static opposite(matrix) {
        return matrix.map(row => row.map(val => -val));
    }

    /**
     * Υψώνει έναν πίνακα σε μια δύναμη (μόνο για τετραγωνικούς πίνακες).
     * @param {number[][]} matrix Ο πίνακας.
     * @param {number} power Η δύναμη.
     * @returns {number[][]} Ο πίνακας υψωμένος στη δύναμη.
     * @static
     */
    static pow(matrix, power) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) {
            throw new Error("Η είσοδος πρέπει να είναι τετραγωνικός πίνακας.");
        }
        if (power === 0) {
            return Matrix2d.identity(matrix.length);
        }
        let result = Matrix2d.clone(matrix);
        for (let i = 1; i < power; i++) {
            result = Matrix2d.mult(result, matrix);
        }
        return result;
    }

    /**
     * Αναστρέφει έναν πίνακα.
     * @param {number[][]} matrix Ο πίνακας.
     * @returns {number[][]} Ο αναστροφικός πίνακας.
     * @static
     */
    static transpose(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
        const transposed = [];
        for (let j = 0; j < cols; j++) {
            transposed[j] = [];
            for (let i = 0; i < rows; i++) {
                transposed[j][i] = matrix[i][j];
            }
        }
        return transposed;
    }

     /**
     * Υπολογίζει την ορίζουσα ενός πίνακα 2x2.
     * @param {number[][]} matrix Ο πίνακας 2x2.
     * @returns {number} Η ορίζουσα του πίνακα.
     * @throws {Error} Εάν ο πίνακας δεν είναι 2x2.
     * @static
     */
     static determinant2x2(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== 2 || matrix[0].length !== 2) {
            throw new Error("Ο πίνακας δεν είναι 2x2.");
        }
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    /**
     * Υπολογίζει την ορίζουσα ενός τετραγωνικού πίνακα με αναγωγή σε άνω τριγωνικό.
     * @param {number[][]} matrix Ο τετραγωνικός πίνακας.
     * @returns {number} Η ορίζουσα του πίνακα.
     * @throws {Error} Εάν ο πίνακας δεν είναι τετραγωνικός.
     * @static
     */
    static determinant(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) {
            throw new Error("Ο πίνακας πρέπει να είναι τετραγωνικός.");
        }
        const n = matrix.length;
        let det = 1;
        const tempMatrix = Matrix2d.clone(matrix); // Δημιουργούμε ένα αντίγραφο για να μην αλλάξουμε τον αρχικό πίνακα

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                while (tempMatrix[j][i] !== 0) {
                    const c = tempMatrix[i][i] / tempMatrix[j][i];
                    for (let k = i; k < n; k++) {
                        const temp = tempMatrix[i][k];
                        tempMatrix[i][k] = tempMatrix[j][k];
                        tempMatrix[j][k] = temp - c * tempMatrix[j][k];
                    }
                    det *= -1; // Αλλάζουμε πρόσημο όταν αλλάζουμε γραμμές
                }
            }
            det *= tempMatrix[i][i];
        }
        return det;
    }

    /**
     * Υπολογίζει τον συμπαράγοντα ενός στοιχείου πίνακα.
     * @param {number[][]} matrix Ο πίνακας.
     * @param {number} row Η γραμμή του στοιχείου.
     * @param {number} col Η στήλη του στοιχείου.
     * @returns {number} Ο συμπαράγοντας του στοιχείου.
     * @throws {Error} Εάν ο πίνακας δεν είναι τετραγωνικός.
     * @static
     */
    static cofactor(matrix, row, col) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) {
            throw new Error("Ο πίνακας πρέπει να είναι τετραγωνικός.");
        }
        const submatrix = [];
        for (let i = 0; i < matrix.length; i++) {
            if (i === row) continue;
            const subrow = [];
            for (let j = 0; j < matrix.length; j++) {
                if (j === col) continue;
                subrow.push(matrix[i][j]);
            }
            submatrix.push(subrow);
        }
        return Math.pow(-1, row + col) * Matrix2d.determinant(submatrix);
    }

    /**
     * Υπολογίζει τον προσαρτημένο πίνακα.
     * @param {number[][]} matrix Ο πίνακας.
     * @returns {number[][]} Ο προσαρτημένος πίνακας.
     * @throws {Error} Εάν ο πίνακας δεν είναι τετραγωνικός.
     * @static
     */
    static adjugate(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) {
            throw new Error("Ο πίνακας πρέπει να είναι τετραγωνικός.");
        }
        const n = matrix.length;
        const adjugate = Matrix2d.zero(n, n);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                adjugate[j][i] = Matrix2d.cofactor(matrix, i, j); // Προσοχή στην αλλαγή i και j
            }
        }
        return adjugate;
    }

    /**
     * Υπολογίζει τον αντίστροφο πίνακα.
     * @param {number[][]} matrix Ο πίνακας.
     * @returns {number[][]} Ο αντίστροφος πίνακας.
     * @throws {Error} Εάν ο πίνακας δεν είναι τετραγωνικός ή η ορίζουσα είναι 0.
     * @static
     */
    static inverse(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) {
            throw new Error("Ο πίνακας πρέπει να είναι τετραγωνικός.");
        }
        const det = Matrix2d.determinant(matrix);
        if (det === 0) {
            throw new Error("Ο πίνακας δεν είναι αντιστρέψιμος (μηδενική ορίζουσα).");
        }
        const adj = Matrix2d.adjugate(matrix);
        return Matrix2d.scalarMult(adj, 1 / det);
    }

    /**
     * Δημιουργεί έναν μοναδιαίο πίνακα διαστάσεων n x n.
     * @param {number} n Η διάσταση του πίνακα.
     * @returns {number[][]} Ο μοναδιαίος πίνακας.
     * @static
     */
    static identity(n) {
        const matrix = [];
        for (let i = 0; i < n; i++) {
            matrix[i] = [];
            for (let j = 0; j < n; j++) {
                matrix[i][j] = i === j ? 1 : 0;
            }
        }
        return matrix;
    }
     /**
     * Δημιουργεί έναν μηδενικό πίνακα διαστάσεων rows x cols.
     * @param {number} rows Ο αριθμός των γραμμών.
     * @param {number} cols Ο αριθμός των στηλών.
     * @returns {number[][]} Ο μηδενικός πίνακας.
     * @static
     */
    static zero(rows,cols) {
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < cols; j++) {
                matrix[i][j] = 0;
            }
        }
        return matrix;
    }
    /**
     * Πολλαπλασιάζει δύο πίνακες.
     * @param {number[][]} matrix1 Ο πρώτος πίνακας.
     * @param {number[][]} matrix2 Ο δεύτερος πίνακας.
     * @returns {number[][]} Το γινόμενο των δύο πινάκων.
     * @static
     */
    static mult(matrix1, matrix2) {
        const m = matrix1.length;
        const n = matrix1[0].length;
        const p = matrix2[0].length;
        const result = [];
        for (let i = 0; i < m; i++) {
            result[i] = [];
            for (let j = 0; j < p; j++) {
                let sum = 0;
                for (let k = 0; k < n; k++) {
                    sum += matrix1[i][k] * matrix2[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }
    /**
     * Πολλαπλασιάζει έναν πίνακα με έναν αριθμό (scalar).
     * @param {number[][]} matrix Ο πίνακας.
     * @param {number} scalar Ο αριθμός.
     * @returns {number[][]} Ο πίνακας πολλαπλασιασμένος με τον αριθμό.
     * @static
     */
    static scalarMult(matrix, scalar) {
        return matrix.map(row => row.map(val => val * scalar));
    }
    /**
     * Προσθέτει δύο πίνακες.
     * @param {number[][]} matrix1 Ο πρώτος πίνακας.
     * @param {number[][]} matrix2 Ο δεύτερος πίνακας.
     * @returns {number[][]} Το άθροισμα των δύο πινάκων.
     * @static
     */
    static add(matrix1, matrix2) {
        return matrix1.map((row, i) => row.map((val, j) => val + matrix2[i][j]));
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι διαγώνιος.
     * @param {number[][]} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν ο πίνακας είναι διαγώνιος, false αλλιώς.
     * @static
     */
    static isDiagonal(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix)) return false;
        const rows = Matrix2d.numberOfRows(matrix);
        const cols = Matrix2d.numberOfCols(matrix);
        if (rows !== cols) return false; // Πρέπει να είναι τετραγωνικός
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (i !== j && matrix[i][j] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι συμμετρικός.
     * @param {number[][]} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν ο πίνακας είναι συμμετρικός, false αλλιώς.
     * @static
     */
    static isSymmetric(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) return false;
        const transposed = Matrix2d.transpose(matrix);
        return Matrix2d.isEquals(matrix, transposed);
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι αντι-συμμετρικός (skew-symmetric).
     * @param {number[][]} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν ο πίνακας είναι αντι-συμμετρικός, false αλλιώς.
     * @static
     */
    static isSkewSymmetric(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) return false;
        const transposed = Matrix2d.transpose(matrix);
        const opposite = Matrix2d.opposite(matrix);
        return Matrix2d.isEquals(transposed, opposite);
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι θετικός (όλα τα στοιχεία > 0).
     * @param {number[][]} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν ο πίνακας είναι θετικός, false αλλιώς.
     * @static
     */
    static isPositive(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix)) return false;
        return matrix.every(row => row.every(val => val > 0));
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι μη-αρνητικός (όλα τα στοιχεία >= 0).
     * @param {number[][]} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν ο πίνακας είναι μη-αρνητικός, false αλλιώς.
     * @static
     */
    static isNonNegative(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix)) return false;
        return matrix.every(row => row.every(val => val >= 0));
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι μηδενικός (όλα τα στοιχεία = 0).
     * @param {number[][]} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν ο πίνακας είναι μηδενικός, false αλλιώς.
     * @static
     */
    static isZero(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix)) return false;
        return matrix.every(row => row.every(val => val === 0));
    }
    /**
     * Κλωνοποιεί έναν πίνακα εξαιρώντας μια γραμμή και μια στήλη.
     * @param {number[][]} matrix Ο αρχικός πίνακας.
     * @param {number} row Η γραμμή που θα εξαιρεθεί.
     * @param {number} col Η στήλη που θα εξαιρεθεί.
     * @returns {number[][]} Ο κλώνος του πίνακα χωρίς τη γραμμή και τη στήλη.
     * @static
     */
    static cloneExcludeRowCol(matrix, row, col) {
        if (!Matrix2d.isTwoDimensional(matrix)) return [];
        return matrix.filter((_, i) => i !== row).map(r => r.filter((_, j) => j !== col));
    }

    /**
     * Κλωνοποιεί έναν πίνακα εξαιρώντας μια γραμμή.
     * @param {number[][]} matrix Ο αρχικός πίνακας.
     * @param {number} row Η γραμμή που θα εξαιρεθεί.
     * @returns {number[][]} Ο κλώνος του πίνακα χωρίς τη γραμμή.
     * @static
     */
    static cloneExcludeRow(matrix, row) {
        if (!Matrix2d.isTwoDimensional(matrix)) return [];
        return matrix.filter((_, i) => i !== row);
    }

    /**
     * Κλωνοποιεί έναν πίνακα εξαιρώντας μια στήλη.
     * @param {number[][]} matrix Ο αρχικός πίνακας.
     * @param {number} col Η στήλη που θα εξαιρεθεί.
     * @returns {number[][]} Ο κλώνος του πίνακα χωρίς τη στήλη.
     * @static
     */
    static cloneExcludeCol(matrix, col) {
        if (!Matrix2d.isTwoDimensional(matrix)) return [];
        return matrix.map(r => r.filter((_, j) => j !== col));
    }
    /**
     * Ελέγχει αν ένας πίνακας είναι διαγωνίως κυρίαρχος.
     * @param {number[][]} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν είναι διαγωνίως κυρίαρχος, false αλλιώς.
     * @static
     */
    static isDiagonallyDominant(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) return false;
        const n = matrix.length;
        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    sum += Math.abs(matrix[i][j]);
                }
            }
            if (Math.abs(matrix[i][i]) < sum) {
                return false;
            }
        }
        return true;
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι αυστηρά διαγωνίως κυρίαρχος.
     * @param {number[][]} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν είναι αυστηρά διαγωνίως κυρίαρχος, false αλλιώς.
     * @static
     */
    static isStrictlyDiagonallyDominant(matrix) {
         if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) return false;
        const n = matrix.length;
        for (let i = 0; i < n; i++) {
            let sum = 0;
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    sum += Math.abs(matrix[i][j]);
                }
            }
            if (Math.abs(matrix[i][i]) <= sum) { //αυστηρά <
                return false;
            }
        }
        return true;
    }

    /**
     * Προσθέτει μια σταθερά (scalar) σε κάθε στοιχείο ενός πίνακα.
     * @param {number[][]} matrix Ο πίνακας.
     * @param {number} scalar Η σταθερά που θα προστεθεί.
     * @returns {number[][]} Ο πίνακας με την προσθήκη της σταθεράς.
     * @static
     */
    static scalarAdd(matrix, scalar) {
        if (!Matrix2d.isTwoDimensional(matrix)) return [];
        return matrix.map(row => row.map(val => val + scalar));
    }

    /**
     * Υψώνει κάθε στοιχείο ενός πίνακα σε μια δύναμη (scalar).
     * @param {number[][]} matrix Ο πίνακας.
     * @param {number} scalar Η δύναμη.
     * @returns {number[][]} Ο πίνακας με τα στοιχεία υψωμένα στη δύναμη.
     * @static
     */
    static scalarPow(matrix, scalar) {
        if (!Matrix2d.isTwoDimensional(matrix)) return [];
        return matrix.map(row => row.map(val => Math.pow(val, scalar)));
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι άνω τριγωνικός.
     * @param {number[][]} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν είναι άνω τριγωνικός, false αλλιώς.
     * @static
     */
    static isUpperTriangular(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) return false;
        const n = matrix.length;
        for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (matrix[i][j] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι αυστηρά άνω τριγωνικός.
     * @param {number[][]} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν είναι αυστηρά άνω τριγωνικός, false αλλιώς.
     * @static
     */
    static isStrictlyUpperTriangular(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) return false;
        const n = matrix.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j <= i; j++) { // <= για να ελέγξει και την διαγώνιο.
                if (matrix[i][j] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι κάτω τριγωνικός.
     * @param {number[][]} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν είναι κάτω τριγωνικός, false αλλιώς.
     * @static
     */
    static isLowerTriangular(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) return false;
        const n = matrix.length;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                if (matrix[i][j] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι αυστηρά κάτω τριγωνικός.
     * @param {number[][]} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν είναι αυστηρά κάτω τριγωνικός, false αλλιώς.
     * @static
     */
    static isStrictlyLowerTriangular(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix) || matrix.length !== matrix[0].length) return false;
        const n = matrix.length;
        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) { //>=
                if (matrix[i][j] !== 0) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Υπολογίζει τον συζυγή ενός πίνακα (σε πραγματικούς πίνακες, είναι ο ίδιος ο πίνακας).
     * @param {number[][]} matrix Ο πίνακας *πραγματικών* αριθμών.
     * @returns {number[][]} Ο συζυγής πίνακας (ίδιος με τον αρχικό).
     * @static
     */
    static conjugate(matrix) {
        return Matrix2d.clone(matrix);
    }

    /**
     * Υπολογίζει τον συζυγή ανάστροφο (σε πραγματικούς πίνακες, είναι απλά ο ανάστροφος).
     * @param {number[][]} matrix Ο πίνακας *πραγματικών* αριθμών.
     * @returns {number[][]} Ο ανάστροφος πίνακας.
     * @static
     */
    static conjugateTranspose(matrix) {
        return Matrix2d.transpose(matrix);
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι Ερμιτιανός (σε πραγματικούς πίνακες, ελέγχει αν είναι συμμετρικός).
     * @param {number[][]} matrix Ο πίνακας *πραγματικών* αριθμών.
     * @returns {boolean} True αν είναι συμμετρικός, false αλλιώς.
     * @static
     */
    static isHermitian(matrix) {
        return Matrix2d.isSymmetric(matrix);
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι αντι-Ερμιτιανός (σε πραγματικούς πίνακες, ελέγχει αν είναι αντι-συμμετρικός).
     * @param {number[][]} matrix Ο πίνακας *πραγματικών* αριθμών.
     * @returns {boolean} True αν είναι αντι-συμμετρικός, false αλλιώς.
     * @static
     */
    static isSkewHermitian(matrix) {
        return Matrix2d.isSkewSymmetric(matrix);
    }

    /**
     * Επίλυση γραμμικού συστήματος με τη μέθοδο Cramer.
     * @param {number[][]} coefficients Ο πίνακας των συντελεστών (τετραγωνικός).
     * @param {number[]} constants Ο πίνακας/στήλη των σταθερών όρων.
     * @returns {number[]} Ο πίνακας/στήλη των λύσεων ή null αν το σύστημα δεν έχει μοναδική λύση.
     * @throws {Error} Εάν οι διαστάσεις δεν είναι συμβατές.
     * @static
     */
    static cramerSolve(coefficients, constants) {
        if (!Matrix2d.isTwoDimensional(coefficients) || !Array.isArray(constants)) {
            throw new Error("Οι παράμετροι πρέπει να είναι πίνακας και πίνακας/στήλη αντίστοιχα.");
        }
        const n = coefficients.length;
        if (n !== coefficients[0].length || n !== constants.length) {
            throw new Error("Οι διαστάσεις δεν είναι συμβατές (τετραγωνικός πίνακας και στήλη ίδιου μεγέθους).");
        }

        const detA = Matrix2d.determinant(coefficients);

        if (detA === 0) {
            return null; // Το σύστημα δεν έχει μοναδική λύση (είτε καμία, είτε άπειρες).
        }

        const solutions = [];

        for (let i = 0; i < n; i++) {
            // Δημιουργούμε τον πίνακα Αi αντικαθιστώντας την i-οστή στήλη του Α με τις σταθερές.
            const Ai = Matrix2d.clone(coefficients);
            for (let j = 0; j < n; j++) {
                Ai[j][i] = constants[j];
            }
            const detAi = Matrix2d.determinant(Ai);
            solutions[i] = detAi / detA;
        }

        return solutions;
    }

    /**
     * Τριγωνοποίηση πίνακα με μερική οδήγηση (απαλοιφή Gauss με μερική οδήγηση).
     * @param {number[][]} matrix Ο πίνακας προς τριγωνοποίηση.
     * @returns {number[][]} Ο άνω τριγωνικός πίνακας.
     * @throws {Error} Εάν ο πίνακας δεν είναι δισδιάστατος.
     * @static
     */
    static partialPivoting(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix)) {
            throw new Error("Ο πίνακας πρέπει να είναι δισδιάστατος.");
        }

        const n = matrix.length;
        const A = Matrix2d.clone(matrix); // Δημιουργούμε κλώνο για να μην τροποποιήσουμε τον αρχικό

        for (let i = 0; i < n; i++) {
            // Βρίσκουμε το στοιχείο με τη μεγαλύτερη απόλυτη τιμή στην i-οστή στήλη (κάτω από την i-οστή γραμμή)
            let maxRow = i;
            for (let k = i + 1; k < n; k++) {
                if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
                    maxRow = k;
                }
            }

            // Εναλλαγή γραμμών (αν χρειάζεται)
            if (maxRow !== i) {
                [A[i], A[maxRow]] = [A[maxRow], A[i]]; // Destructuring assignment για swap
            }

            // Μηδενισμός στοιχείων κάτω από τον οδηγό
            for (let j = i + 1; j < n; j++) {
                const factor = A[j][i] / A[i][i];
                for (let k = i; k < n; k++) {
                    A[j][k] -= factor * A[i][k];
                }
            }
        }

        return A;
    }

    /**
     * Τριγωνοποίηση πίνακα με μερική οδήγηση με στάθμιση (απαλοιφή Gauss με μερική οδήγηση με στάθμιση).
     * @param {number[][]} matrix Ο πίνακας προς τριγωνοποίηση.
     * @returns {number[][]} Ο άνω τριγωνικός πίνακας.
     * @throws {Error} Εάν ο πίνακας δεν είναι δισδιάστατος.
     * @static
     */
    static scaledPartialPivoting(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix)) {
            throw new Error("Ο πίνακας πρέπει να είναι δισδιάστατος.");
        }

        const n = matrix.length;
        const A = Matrix2d.clone(matrix);
        const scales = new Array(n).fill(0); // Πίνακας με τις στάθμεις

        // Υπολογισμός των σταθμών για κάθε γραμμή
        for (let i = 0; i < n; i++) {
            let max = 0;
            for (let j = 0; j < n; j++) {
                max = Math.max(max, Math.abs(A[i][j]));
            }
            scales[i] = max;
            if (max === 0) {
                throw new Error("Ο πίνακας είναι μοναδιαίος (singular) και δεν επιδέχεται επίλυση με αυτή την μέθοδο.");
            }
        }

        for (let i = 0; i < n; i++) {
            // Βρίσκουμε τη γραμμή με το μέγιστο λόγο |A[k][i]| / scales[k]
            let maxRatio = 0;
            let maxRow = i;
            for (let k = i; k < n; k++) {
                const ratio = Math.abs(A[k][i]) / scales[k];
                if (ratio > maxRatio) {
                    maxRatio = ratio;
                    maxRow = k;
                }
            }

            // Εναλλαγή γραμμών (αν χρειάζεται)
            if (maxRow !== i) {
                [A[i], A[maxRow]] = [A[maxRow], A[i]];
                [scales[i], scales[maxRow]] = [scales[maxRow], scales[i]];
            }

            // Μηδενισμός στοιχείων κάτω από τον οδηγό
            for (let j = i + 1; j < n; j++) {
                const factor = A[j][i] / A[i][i];
                for (let k = i; k < n; k++) {
                    A[j][k] -= factor * A[i][k];
                }
            }
        }

        return A;
    }

    /**
     * Τριγωνοποίηση πίνακα με ολική οδήγηση (απαλοιφή Gauss με ολική οδήγηση).
     * @param {number[][]} matrix Ο πίνακας προς τριγωνοποίηση.
     * @returns {{matrix: number[][], permutation: number[]}} Ένα αντικείμενο που περιέχει τον άνω τριγωνικό πίνακα και τον πίνακα μεταθέσεων.
     * @throws {Error} Εάν ο πίνακας δεν είναι δισδιάστατος.
     * @static
     */
    static fullPivoting(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix)) {
            throw new Error("Ο πίνακας πρέπει να είναι δισδιάστατος.");
        }

        const n = matrix.length;
        const A = Matrix2d.clone(matrix);
        const permutation = Array.from(Array(n).keys()); // Αρχικοποίηση πίνακα μεταθέσεων

        for (let i = 0; i < n; i++) {
            // Βρίσκουμε το στοιχείο με τη μεγαλύτερη απόλυτη τιμή στον υποπίνακα
            let maxVal = 0;
            let maxRow = i;
            let maxCol = i;

            for (let r = i; r < n; r++) {
                for (let c = i; c < n; c++) {
                    if (Math.abs(A[r][c]) > maxVal) {
                        maxVal = Math.abs(A[r][c]);
                        maxRow = r;
                        maxCol = c;
                    }
                }
            }
            if (maxVal === 0) {
                throw new Error("Ο πίνακας είναι μοναδιαίος (singular).");
            }

            // Εναλλαγή γραμμών
            if (maxRow !== i) {
                [A[i], A[maxRow]] = [A[maxRow], A[i]];
            }

            // Εναλλαγή στηλών (και ενημέρωση του πίνακα μεταθέσεων)
            if (maxCol !== i) {
                for(let k=0; k<n;k++){
                    [A[k][i], A[k][maxCol]] = [A[k][maxCol], A[k][i]];
                }
                [permutation[i], permutation[maxCol]] = [permutation[maxCol], permutation[i]];
            }

            // Μηδενισμός στοιχείων κάτω από τον οδηγό
            for (let j = i + 1; j < n; j++) {
                const factor = A[j][i] / A[i][i];
                for (let k = i; k < n; k++) {
                    A[j][k] -= factor * A[i][k];
                }
            }
        }

        return { matrix: A, permutation: permutation };
    }

    /**
     * Επίλυση γραμμικού συστήματος με απαλοιφή Gauss και οπισθοδρόμηση.
     * @param {number[][]} coefficients Ο πίνακας των συντελεστών.
     * @param {number[]} constants Οι σταθεροί όροι.
     * @returns {number[]|null} Οι λύσεις του συστήματος ή null αν δεν υπάρχει μοναδική λύση.
     * @static
     */
    static gaussSolve(coefficients, constants) {
        const n = coefficients.length;
        if (n !== constants.length || !Matrix2d.isTwoDimensional(coefficients)) {
            throw new Error("Δεν είναι συμβατές οι διαστάσεις");
        }
        const augmented = coefficients.map((row, i) => [...row, constants[i]]);
        const triangulated = Matrix2d.partialPivoting(augmented);

        if (Matrix2d.determinant(coefficients) === 0) return null; // Έλεγχος για μοναδική λύση

        const solutions = new Array(n).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            solutions[i] = triangulated[i][n];
            for (let j = i + 1; j < n; j++) {
                solutions[i] -= triangulated[i][j] * solutions[j];
            }
            solutions[i] /= triangulated[i][i];
        }

        return solutions;
    }

    /**
     * Επίλυση γραμμικού συστήματος με απαλοιφή Gauss με μερική οδήγηση με στάθμιση και οπισθοδρόμηση.
     * @param {number[][]} coefficients Ο πίνακας των συντελεστών.
     * @param {number[]} constants Οι σταθεροί όροι.
     * @returns {number[]|null} Οι λύσεις του συστήματος ή null αν δεν υπάρχει μοναδική λύση.
     * @static
     */
    static scaledGaussSolve(coefficients, constants) {
        const n = coefficients.length;
        if (n !== constants.length || !Matrix2d.isTwoDimensional(coefficients)) {
            throw new Error("Δεν είναι συμβατές οι διαστάσεις");
        }
        const augmented = coefficients.map((row, i) => [...row, constants[i]]);
        try{
            const triangulated = Matrix2d.scaledPartialPivoting(augmented);

            if (Matrix2d.determinant(coefficients) === 0) return null; // Έλεγχος για μοναδική λύση

            const solutions = new Array(n).fill(0);

            for (let i = n - 1; i >= 0; i--) {
                solutions[i] = triangulated[i][n];
                for (let j = i + 1; j < n; j++) {
                    solutions[i] -= triangulated[i][j] * solutions[j];
                }
                solutions[i] /= triangulated[i][i];
            }

            return solutions;
        }catch(e){
            return null;
        }

    }

    /**
     * Επίλυση γραμμικού συστήματος με απαλοιφή Gauss με ολική οδήγηση και οπισθοδρόμηση.
     * @param {number[][]} coefficients Ο πίνακας των συντελεστών.
     * @param {number[]} constants Οι σταθεροί όροι.
     * @returns {number[]|null} Οι λύσεις του συστήματος ή null αν δεν υπάρχει μοναδική λύση.
     * @static
     */
    static fullGaussSolve(coefficients, constants) {
        const n = coefficients.length;
        if (n !== constants.length || !Matrix2d.isTwoDimensional(coefficients)) {
            throw new Error("Δεν είναι συμβατές οι διαστάσεις");
        }
        const augmented = coefficients.map((row, i) => [...row, constants[i]]);
        try{
            const {matrix:triangulated, permutation} = Matrix2d.fullPivoting(augmented);

            if (Matrix2d.determinant(coefficients) === 0) return null; // Έλεγχος για μοναδική λύση

            const solutions = new Array(n).fill(0);

            for (let i = n - 1; i >= 0; i--) {
                solutions[i] = triangulated[i][n];
                for (let j = i + 1; j < n; j++) {
                    solutions[i] -= triangulated[i][j] * solutions[j];
                }
                solutions[i] /= triangulated[i][i];
            }
            const permutedSolutions = new Array(n);
            for(let i=0; i<n; i++){
                permutedSolutions[permutation[i]] = solutions[i];
            }
            return permutedSolutions;
        }catch(e){
            return null;
        }

    }

    /**
     * Απαλοιφή Gauss με μερική οδήγηση και αποθήκευση πολλαπλασιαστών και εναλλαγών.
     * @param {number[][]} matrix Ο πίνακας προς ανάλυση.
     * @returns {{LU: number[][], p: number[]}} Ένα αντικείμενο με τον LU πίνακα (πολλαπλασιαστές στο κάτω τρίγωνο) και το διάνυσμα εναλλαγών p.
     * @throws {Error} Εάν ο πίνακας δεν είναι δισδιάστατος ή είναι μοναδιαίος.
     * @static
     */
    static decomp(matrix) {
        if (!Matrix2d.isTwoDimensional(matrix)) {
            throw new Error("Ο πίνακας πρέπει να είναι δισδιάστατος.");
        }

        const n = matrix.length;
        const LU = Matrix2d.clone(matrix); // Κλωνοποίηση για να μην τροποποιηθεί ο αρχικός πίνακας
        const p = Array.from(Array(n).keys()); // Δημιουργία πίνακα εναλλαγών

        for (let k = 0; k < n - 1; k++) {
            let maxIndex = k;
            for (let i = k + 1; i < n; i++) {
                if (Math.abs(LU[i][k]) > Math.abs(LU[maxIndex][k])) {
                    maxIndex = i;
                }
            }

            if (LU[maxIndex][k] === 0) {
                throw new Error("Ο πίνακας είναι μοναδιαίος (singular).");
            }

            if (maxIndex !== k) {
                // Εναλλαγή γραμμών και στον πίνακα LU και στον πίνακα εναλλαγών p
                [LU[k], LU[maxIndex]] = [LU[maxIndex], LU[k]];
                [p[k], p[maxIndex]] = [p[maxIndex], p[k]];
            }

            for (let i = k + 1; i < n; i++) {
                LU[i][k] /= LU[k][k]; // Αποθήκευση πολλαπλασιαστή
                for (let j = k + 1; j < n; j++) {
                    LU[i][j] -= LU[i][k] * LU[k][j];
                }
            }
        }

        return { LU, p };
    }

    /**
     * Επίλυση συστήματος Ax=b με LU ανάλυση που προκύπτει από την decomp.
     * @param {number[][]} LU Ο LU πίνακας που προκύπτει από την decomp.
     * @param {number[]} p Το διάνυσμα εναλλαγών που προκύπτει από την decomp.
     * @param {number[]} b το διάνυσμα των σταθερών όρων.
     * @returns {number[]} Το διάνυσμα των λύσεων x.
     * @static
     */
    static LUsolve(LU, p, b){
        const n = LU.length;
        let x = new Array(n);
        let y = new Array(n);
        for(let i=0; i<n; i++){
            y[i] = b[p[i]];
            for(let j=0; j<i; j++){
                y[i] -= LU[i][j]*y[j];
            }
        }
        for(let i=n-1; i>=0; i--){
            x[i] = y[i];
            for(let j=i+1; j<n; j++){
                x[i] -= LU[i][j]*x[j];
            }
            x[i] /= LU[i][i];
        }
        return x;
    }


}