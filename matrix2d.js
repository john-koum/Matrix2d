/**
 * Κλάση για χειρισμό πινάκων.
 * Κουμουνδούρος Γιάννης - johnkoum1@yahoo.gr
 * Έκδοση 0.9 20 ΙΑΝΟΥΑΡΙΟΥ 2025 
 */
class Matrix2d {

    /**
     * Ελέγχει αν μια μεταβλητή είναι δισδιάστατος πίνακας.
     * @param {*} matrix Η μεταβλητή προς έλεγχο.
     * @returns {boolean} True αν είναι δισδιάστατος πίνακας, false αλλιώς.
     * @static
     */
    static isTwoDimensional(matrix) {
        return matrix.length !== 0 && Array.isArray(matrix) && matrix.every(row => Array.isArray(row));
    }

    /**
     * Δημιουργεί ένα κλώνο ενός πίνακα.
     * @param {number[][]} matrix Ο πίνακας προς κλωνοποίηση.
     * @returns {number[][]} Ο κλώνος του πίνακα.
     * @static
     */
    static clone(matrix) {
        //χειρίζεται πίνακες όπως [], [2], [1,4,5], [[2],[4],[6]], [[1,2], [4,5]]
        return matrix.map(item => {
            if (Array.isArray(item)) {
              return this.clone(item); // Αν είναι array, κάνουμε αναδρομική κλήση
            } else {
              return item; // Διαφορετικά, επιστρέφουμε το ίδιο στοιχείο
            }
          });
        //return matrix.map(row => [...row]);
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
    static cell(matrix, ...indices) {
        let currentArray = matrix;

        for (const index of indices) {
          if (!Array.isArray(currentArray) || index < 0 || index >= currentArray.length) {
            throw new Error("Οι διαστάσεις πρέπει να είναι μη αρνητικοί ακέραιοι.");
          }
          currentArray = currentArray[index];
        }
      
        return currentArray;
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
     * @param {any} matrix1 Ο πρώτος πίνακας.
     * @param {any} matrix2 Ο δεύτερος πίνακας.
     * @returns {boolean} True αν είναι ίσοι, false αλλιώς.
     * @static
     */
    static isEquals(matrix1, matrix2) {
                // Ειδική περίπτωση: Και οι δύο πίνακες είναι null ή undefined
        if (matrix1 === matrix2) {
            return true;
        }

        // Ένας από τους δύο είναι null ή undefined, οπότε δεν είναι ίσοι
        if (matrix1 === null || matrix2 === null || matrix1 === undefined || matrix2 === undefined) {
            return false;
        }

        // Έλεγχος τύπου: Και οι δύο πρέπει να είναι πίνακες
        if (!Array.isArray(matrix1) || !Array.isArray(matrix2)) {
            return false;
        }

        // Έλεγχος μήκους: Οι πίνακες πρέπει να έχουν το ίδιο μήκος
        if (matrix1.length !== matrix2.length) {
            return false;
        }

        // Αναδρομικός έλεγχος για κάθε στοιχείο
        for (let i = 0; i < matrix1.length; i++) {
            if (Array.isArray(matrix1[i]) && Array.isArray(matrix2[i])) {
            // Αν είναι και τα δύο arrays, κάνουμε αναδρομική κλήση
            if (!this.isEquals(matrix1[i], matrix2[i])) {
                return false;
            }
            } else if (typeof matrix1[i] === 'object' && typeof matrix2[i] === 'object') {
            // Αν είναι και τα δύο objects, χρησιμοποιούμε JSON.stringify για σύγκριση
            if (JSON.stringify(matrix1[i]) !== JSON.stringify(matrix2[i])) {
                return false;
            }
            } else if (matrix1[i] !== matrix2[i]) {
            // Διαφορετικά, συγκρίνουμε τις απλές τιμές
            return false;
            }
        }

        return true;
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
     * Δημιουργεί έναν μοναδιαίο πίνακα διαστάσεων n x n. (Σταθερά)
     * @param {number} n Η διάσταση του πίνακα.
     * @returns {number[][]} Ο μοναδιαίος πίνακας.
     * @static
     */
    static IDENTITY(n) {
        if (n <= 0 || !Number.isInteger(n)) {
            throw new Error("Η διάσταση πρέπει να είναι θετικός ακέραιος.");
        }
        return Matrix2d.identity(n);
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
     * Προσθέτει δύο πίνακες, ανεξάρτητα από τις διαστάσεις τους.
     * 
     * Η μέθοδος δημιουργεί έναν νέο πίνακα που είναι το άθροισμα των δύο εισόδων.
     * Αν οι πίνακες έχουν διαφορετικές διαστάσεις, συμπληρώνει τα κενά στοιχεία με μηδέν.
     * 
     * @param {Array} matrix1 - Ο πρώτος πίνακας που θα προστεθεί. Μπορεί να είναι πολυδιάστατος.
     * @param {Array} matrix2 - Ο δεύτερος πίνακας που θα προστεθεί. Μπορεί να είναι πολυδιάστατος.
     * @returns {Array} Ένας νέος πίνακας που αποτελεί το άθροισμα των δύο εισόδων.
     */
    static add(matrix1, matrix2) {
        // Ειδική περίπτωση: Και οι δύο πίνακες είναι κενοί
        if (!matrix1.length && !matrix2.length) {
          return [];
        }
      
        // Βρίσκουμε τις διαστάσεις του μεγαλύτερου πίνακα
        const maxRows = Math.max(matrix1.length, matrix2.length);
        const maxCols = Math.max(...matrix1.map(row => row.length), ...matrix2.map(row => row.length));
      
        // Δημιουργούμε έναν νέο πίνακα για το αποτέλεσμα
        const result = [];
      
        for (let i = 0; i < maxRows; i++) {
          result[i] = [];
          for (let j = 0; j < maxCols; j++) {
            // Αν υπάρχει στοιχείο και στους δύο πίνακες, το προσθέτουμε
            const val1 = matrix1[i]?.[j] || 0;
            const val2 = matrix2[i]?.[j] || 0;
            result[i][j] = val1 + val2;
          }
        }
      
        return result;
      }
    
    /**
     * Προσθέτει μια σταθερά (scalar) σε κάθε στοιχείο ενός πίνακα, συμπεριλαμβανομένων και των ενσωματωμένων πινάκων.
     *
     * Η μέθοδος εξερευνά αναδρομικά τον πίνακα και προσθέτει τη σταθερά σε κάθε στοιχείο που είναι αριθμός.
     *
     * @param {Array} matrix - Ο πίνακας στον οποίο θα εφαρμοστεί η πράξη. Μπορεί να περιέχει οποιοδήποτε τύπο δεδομένων, συμπεριλαμβανομένων και άλλων πινάκων.
     * @param {number} scalar - Η σταθερά που θα προστεθεί σε κάθε αριθμητικό στοιχείο.
     * @returns {Array} Ένας νέος πίνακας με το αποτέλεσμα της πρόσθεσης.
     */
    static scalarAdd(matrix, scalar) {
        // Αν ο matrix δεν είναι πίνακας, επιστρέφουμε τον ίδιο
        if (!Array.isArray(matrix)) {
          return matrix;
        }
      
        // Δημιουργούμε έναν νέο πίνακα για να αποφύγουμε παρενέργειες
        const result = [];
      
        for (let i = 0; i < matrix.length; i++) {
          result[i] = [];
          for (let j = 0; j < matrix[i].length; j++) {
            if (Array.isArray(matrix[i][j])) {
              // Αν είναι πίνακας, καλούμε αναδρομικά τη συνάρτηση
              result[i][j] = this.scalarAdd(matrix[i][j], scalar);
            } else {
              // Διαφορετικά, προσθέτουμε τη σταθερά
              result[i][j] = matrix[i][j] + scalar;
            }
          }
        }
      
        return result;
      }

    /**
     * Αφαιρεί δύο πίνακες, ανεξάρτητα από τις διαστάσεις τους.
     * 
     * Η μέθοδος δημιουργεί έναν νέο πίνακα που είναι η διαφορά των δύο εισόδων.
     * Αν οι πίνακες έχουν διαφορετικές διαστάσεις, συμπληρώνει τα κενά στοιχεία με μηδέν.
     * 
     * @param {Array} matrix1 Ο πρώτος πίνακας που θα αφαιρεθεί. Μπορεί να είναι πολυδιάστατος.
     * @param {Array[][]} matrix2 Ο δεύτερος πίνακας που θα αφαιρεθεί από τον πρώτο. Μπορεί να είναι πολυδιάστατος.
     * @returns {Array} Ένας νέος πίνακας που αποτελεί τη διαφορά των δύο εισόδων.
     */
    static sub(matrix1, matrix2) {
        // Βρίσκουμε τις διαστάσεις του μεγαλύτερου πίνακα
        const maxRows = Math.max(matrix1.length, matrix2.length);
        const maxCols = Math.max(...matrix1.map(row => row.length), ...matrix2.map(row => row.length));
    
        // Δημιουργούμε έναν νέο πίνακα για το αποτέλεσμα
        const result = [];
    
        for (let i = 0; i < maxRows; i++) {
        result[i] = [];
        for (let j = 0; j < maxCols; j++) {
            // Αν υπάρχει στοιχείο και στους δύο πίνακες, το αφαιρούμε
            const val1 = matrix1[i]?.[j] || 0;
            const val2 = matrix2[i]?.[j] || 0;
            result[i][j] = val1 - val2;
        }
        }
    
        return result;
    }

        
    /**
     * Πολλαπλασιάζει δύο πίνακες.
     *
     * @param {Array} matrix1 Ο πρώτος πίνακας.
     * @param {Array} matrix2 Ο δεύτερος πίνακας.
     * @returns {Array} Το γινόμενο των δύο πινάκων.
     * @throws {Error} Αν οι πίνακες δεν έχουν τις κατάλληλες διαστάσεις ή αν περιέχουν μη αριθμητικά στοιχεία.
     */
    static mult(matrix1, matrix2) {
        // Έλεγχος αν οι παράμετροι είναι πίνακες
        if (!Array.isArray(matrix1) || !Array.isArray(matrix2)) {
        throw new Error('Οι παράμετροι πρέπει να είναι πίνακες.');
        }
    
        // Έλεγχος αν οι πίνακες είναι κενές μήτρες
        if (matrix1.length === 0 || matrix2.length === 0 || matrix1[0].length === 0 || matrix2[0].length === 0) {
        throw new Error('Οι πίνακες δεν μπορούν να είναι κενές μήτρες.');
        }
    
        // Έλεγχος αν ο αριθμός των στηλών του πρώτου πίνακα είναι ίσος με τον αριθμό των γραμμών του δεύτερου
        if (matrix1[0].length !== matrix2.length) {
        throw new Error('Ο αριθμός των στηλών του πρώτου πίνακα πρέπει να είναι ίσος με τον αριθμό των γραμμών του δεύτερου.');
        }
    
        // Έλεγχος αν όλα τα στοιχεία είναι αριθμοί
        if (!matrix1.every(row => row.every(element => typeof element === 'number')) ||
            !matrix2.every(row => row.every(element => typeof element === 'number'))) {
        throw new Error('Οι πίνακες πρέπει να περιέχουν μόνο αριθμούς.');
        }
    
        // Υπολογισμός του γινομένου
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
     * Πολλαπλασιάζει έναν πίνακα με έναν αριθμό (scalar), ανεξαρτήτως του βάθους του πίνακα.
     *
     * @param {Array} matrix Ο πίνακας. Μπορεί να είναι πολυδιάστατος.
     * @param {number} scalar Ο αριθμός με τον οποίο θα πολλαπλασιαστούν τα στοιχεία.
     * @returns {Array} Ο νέος πίνακας με τα πολλαπλασιασμένα στοιχεία.
     * @throws {TypeError} Αν ο πρώτος παράμετρος δεν είναι πίνακας.
     * @throws {TypeError} Αν ο δεύτερος παράμετρος δεν είναι αριθμός.
     */
    static scalarMult(matrix, scalar) {
        if (!Array.isArray(matrix)) {
            throw new TypeError('Ο πρώτος παράμετρος πρέπει να είναι πίνακας.');
        }
        if (typeof scalar !== 'number') {
            throw new TypeError('Ο δεύτερος παράμετρος πρέπει να είναι αριθμός.');
        }

        return matrix.map(element => {
            if (Array.isArray(element)) {
                return this.scalarMult(element, scalar); // Αναδρομική κλήση για υποπίνακες
            } else {
                return element * scalar;
            }
        });
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
     * Υψώνει κάθε στοιχείο ενός πίνακα σε μια δύναμη (scalar), ανεξαρτήτως του βάθους του πίνακα.
     *
     * @param {Array} matrix Ο πίνακας. Μπορεί να είναι πολυδιάστατος.
     * @param {number} scalar Η δύναμη στην οποία θα υψωθούν τα στοιχεία. Πρέπει να είναι θετικός αριθμός.
     * @returns {Array} Ο νέος πίνακας με τα στοιχεία υψωμένα στη δύναμη.
     * @throws {TypeError} Αν ο πρώτος παράμετρος δεν είναι πίνακας.
     * @throws {TypeError} Αν ο δεύτερος παράμετρος δεν είναι αριθμός.
     * @throws {RangeError} Αν ο δεύτερος παράμετρος δεν είναι θετικός αριθμός.
     */
    static scalarPow(matrix, scalar) {
        if (!Array.isArray(matrix)) {
            throw new TypeError('Ο πρώτος παράμετρος πρέπει να είναι πίνακας.');
        }
        if (typeof scalar !== 'number') {
            throw new TypeError('Ο δεύτερος παράμετρος πρέπει να είναι αριθμός.');
        }
        if (scalar <= 0) {
            throw new RangeError('Η δύναμη πρέπει να είναι θετικός αριθμός.');
        }

        return matrix.map(element => {
            if (Array.isArray(element)) {
                return this.scalarPow(element, scalar); // Αναδρομική κλήση για υποπίνακες
            } else if (typeof element === 'number') {
                return Math.pow(element, scalar);
            } else {
                throw new TypeError('Τα στοιχεία του πίνακα πρέπει να είναι αριθμοί.');
            }
        });
    }
     
    /**
     * Υπολογίζει το ίχνος ενός πίνακα (άθροισμα των διαγώνιων στοιχείων).
     *
     * @param {Array} matrix Ο πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @returns {number} Το ίχνος του πίνακα.
     * @static
     */
    static trace(matrix) {
        // Έλεγχος αν η είσοδος είναι πίνακας
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        // Ειδική περίπτωση για μονοδιάστατους πίνακες
        if (matrix.length === 1 && !Array.isArray(matrix[0])) {
            return matrix[0];
        }

        // Για δισδιάστατους και πολυδιάστατους πίνακες
        let trace = 0;
        for (let i = 0; i < Math.min(matrix.length, matrix[0].length); i++) {
            trace += matrix[i][i];
        }
        return trace;
    }

    /**
     * Επιστρέφει τη διαγώνιο ενός πίνακα ως πίνακα μιας στήλης.
     *
     * @param {Array} matrix Ο πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @param {boolean} [includeAllDiagonals=false] Αν είναι true, επιστρέφει όλες τις διαγώνιους ενός δισδιάστατου πίνακα.
     * @returns {Array[]} Ένας πίνακας που περιέχει τις διαγωνίους του εισερχόμενου πίνακα.
     * @static
     */
    static diagonal(matrix, includeAllDiagonals = false) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        if (matrix.length === 0) {
            return []; // Κενός πίνακας
        }

        if (!Array.isArray(matrix[0])) {
            // Μονοδιάστατος πίνακας
            return matrix;
        }

        // Δισδιάστατος ή πολυδιάστατος πίνακας
        const diagonals = [];
        const minLength = Math.min(matrix.length, matrix[0].length);

        // Κύρια διαγώνιος
        for (let i = 0; i < minLength; i++) {
            diagonals.push(matrix[i][i]);
        }

        // Αν ζητηθεί, υπολογίζουμε και τις υπόλοιπες διαγώνιους (μόνο για δισδιάστατους πίνακες)
        if (includeAllDiagonals && matrix.length === matrix[0].length) {
            // Ανώτερη τριγωνική
            for (let i = 0; i < matrix.length - 1; i++) {
                for (let j = i + 1; j < matrix.length; j++) {
                    diagonals.push(matrix[i][j]);
                }
            }
            // Κατώτερη τριγωνική
            for (let i = 1; i < matrix.length; i++) {
                for (let j = 0; j < i; j++) {
                    diagonals.push(matrix[i][j]);
                }
            }
        }

        return diagonals;
    }

    /**
     * Επιστρέφει τον αντίθετο πίνακα.
     *
     * @param {Array} matrix Ο πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @returns {Array} Ο αντίθετος πίνακας.
     * @static
     */
    static opposite(matrix) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        return matrix.map(element => {
            if (Array.isArray(element)) {
                return this.opposite(element); // Αναδρομική κλήση για υποπίνακες
            } else if (typeof element === 'number') {
                return -element;
            } else {
                // Εδώ μπορείς να προσθέσεις λογική για άλλους τύπους δεδομένων, π.χ.
                // return element; // Αν θέλεις να αφήσεις άλλους τύπους αναλλοίωτους
                throw new TypeError('Τα στοιχεία του πίνακα πρέπει να είναι αριθμοί.');
            }
        });
    }

    /**
     * Μεταθέτει έναν πίνακα.
     *
     * @param {Array} matrix Ο πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @returns {Array} Ο μεταθεμένος πίνακας.
     * @static
     */
    static transpose(matrix) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        if (matrix.length === 0) {
            return []; // Κενός πίνακας
        }

        if (!Array.isArray(matrix[0])) {
            // Μονοδιάστατος πίνακας: μετατροπή σε πίνακα στήλης
            return matrix.map(x => [x]);
        }

        // Δισδιάστατος ή πολυδιάστατος πίνακας
        const rows = matrix.length;
        const cols = matrix[0].length;
        const transposed = [];

        for (let j = 0; j < cols; j++) {
            transposed[j] = [];
            for (let i = 0; i < rows; i++) {
                if (Array.isArray(matrix[i][j])) {
                    transposed[j][i] = this.transpose(matrix[i][j]); // Αναδρομική κλήση
                } else {
                    transposed[j][i] = matrix[i][j];
                }
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
     *
     * @param {Array} matrix Ο πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @returns {boolean} True αν ο πίνακας είναι θετικός, false αλλιώς.
     * @static
     */
    static isPositive(matrix) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        return matrix.every(element => {
            if (Array.isArray(element)) {
                return this.isPositive(element); // Αναδρομική κλήση για υποπίνακες
            } else if (typeof element === 'number') {
                return element > 0;
            } else {
                throw new TypeError('Τα στοιχεία του πίνακα πρέπει να είναι αριθμοί.');
            }
        });
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι μη-αρνητικός (όλα τα στοιχεία >= 0).
     *
     * @param {Array} matrix Ο πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @returns {boolean} True αν ο πίνακας είναι μη-αρνητικός, false αλλιώς.
     * @static
     */
    static isNonNegative(matrix) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        return matrix.every(element => {
            if (Array.isArray(element)) {
                return this.isNonNegative(element); // Αναδρομική κλήση για υποπίνακες
            } else if (typeof element === 'number') {
                return element >= 0;
            } else {
                throw new TypeError('Τα στοιχεία του πίνακα πρέπει να είναι αριθμοί.');
            }
        });
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι μηδενικός (όλα τα στοιχεία = 0).
     *
     * @param {Array} matrix Ο πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @returns {boolean} True αν ο πίνακας είναι μηδενικός, false αλλιώς.
     * @static
     */
    static isZero(matrix) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        return matrix.every(element => {
            if (Array.isArray(element)) {
                return this.isZero(element); // Αναδρομική κλήση για υποπίνακες
            } else if (typeof element === 'number') {
                return element === 0;
            } else {
                throw new TypeError('Τα στοιχεία του πίνακα πρέπει να είναι αριθμοί.');
            }
        });
    }

    /**
     * Κλωνοποιεί έναν πίνακα εξαιρώντας μια γραμμή και μια στήλη.
     *
     * @param {Array} matrix Ο αρχικός πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @param {number} row Η γραμμή που θα εξαιρεθεί.
     * @param {number} col Η στήλη που θα εξαιρεθεί.
     * @returns {Array} Ο κλώνος του πίνακα χωρίς τη γραμμή και τη στήλη.
     * @static
     */
    static cloneExcludeRowCol(matrix, row, col) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        if (matrix.length === 0) {
            return [];
        }

        if (!Array.isArray(matrix[0])) {
            // Μονοδιάστατος πίνακας
            return [...matrix]; // Επιστρέφουμε μια αντιγραφή
        }

        if (row < 0 || row >= matrix.length || col < 0 || col >= matrix[0].length) {
            throw new Error("Οι δείκτες γραμμής και στήλης είναι εκτός ορίων.");
        }

        return matrix.flatMap((r, i) => {
            if (i === row) return []; // Παράβλεψε τη γραμμή που πρέπει να εξαιρεθεί
            return r.filter((_, j) => j !== col); // Φίλτρο για να εξαιρέσουμε τη στήλη
        });
    }

    /**
     * Κλωνοποιεί έναν πίνακα εξαιρώντας μια γραμμή.
     *
     * @param {Array} matrix Ο αρχικός πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @param {number} row Η γραμμή που θα εξαιρεθεί.
     * @returns {Array} Ο κλώνος του πίνακα χωρίς τη γραμμή.
     * @static
     */
    static cloneExcludeRow(matrix, row) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        if (matrix.length === 0) {
            return [];
        }

        if (!Array.isArray(matrix[0])) {
            // Μονοδιάστατος πίνακας
            return [...matrix]; // Επιστρέφουμε μια αντιγραφή
        }

        if (row < 0 || row >= matrix.length) {
            throw new Error("Ο δείκτης γραμμής είναι εκτός ορίων.");
        }

        return matrix.filter((_, i) => i !== row);
    }

    /**
     * Κλωνοποιεί έναν πίνακα εξαιρώντας μια στήλη.
     *
     * @param {Array} matrix Ο αρχικός πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @param {number} col Η στήλη που θα εξαιρεθεί.
     * @returns {Array} Ο κλώνος του πίνακα χωρίς τη στήλη.
     * @static
     */
    static cloneExcludeCol(matrix, col) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        if (matrix.length === 0) {
            return [];
        }

        if (!Array.isArray(matrix[0])) {
            // Μονοδιάστατος πίνακας
            return [...matrix]; // Επιστρέφουμε μια αντιγραφή
        }

        if (col < 0 || col >= matrix[0].length) {
            throw new Error("Ο δείκτης στήλης είναι εκτός ορίων.");
        }

        return matrix.map(row => {
            return row.filter((_, j) => j !== col);
        });
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
     * Ελέγχει αν ένας πίνακας είναι άνω τριγωνικός.
     *
     * @param {Array} matrix Ο πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @returns {boolean} True αν ο πίνακας είναι άνω τριγωνικός, false αλλιώς.
     * @static
     */
    static isUpperTriangular(matrix) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        if (matrix.length === 0) {
            return true; // Κενός πίνακας θεωρείται άνω τριγωνικός
        }

        if (!Array.isArray(matrix[0])) {
            // Μονοδιάστατος πίνακας
            return true; // Κάθε μονοδιάστατος πίνακας θεωρείται άνω τριγωνικός
        }

        const n = matrix.length;
        for (let i = 1; i < n; i++) {
            for (let j = 0; j < i; j++) {
                if (matrix[i][j] !== 0) {
                    return false;
                }
            }
        }

        // Ελέγχουμε αν οι υποπίνακες είναι άνω τριγωνικοί
        for (let i = 0; i < matrix.length; i++) {
            if (Array.isArray(matrix[i][0])) {
                if (!this.isUpperTriangular(matrix[i])) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι αυστηρά άνω τριγωνικός.
     *
     * @param {Array} matrix Ο πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @returns {boolean} True αν ο πίνακας είναι αυστηρά άνω τριγωνικός, false αλλιώς.
     * @static
     */
    static isStrictlyUpperTriangular(matrix) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        if (matrix.length === 0) {
            return true; // Κενός πίνακας θεωρείται άνω τριγωνικός
        }

        if (!Array.isArray(matrix[0])) {
            // Μονοδιάστατος πίνακας
            return true; // Κάθε μονοδιάστατος πίνακας θεωρείται άνω τριγωνικός
        }

        const n = matrix.length;
        for (let i = 0; i < n; i++) {
            if (Array.isArray(matrix[i][0])) {
                if (!this.isStrictlyUpperTriangular(matrix[i])) {
                    return false;
                }
            } else {
                for (let j = 0; j < i; j++) {
                    if (matrix[i][j] !== 0) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι κάτω τριγωνικός.
     *
     * @param {Array} matrix Ο πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @returns {boolean} True αν είναι κάτω τριγωνικός, false αλλιώς.
     * @static
     */
    static isLowerTriangular(matrix) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        if (matrix.length === 0) {
            return true; // Κενός πίνακας θεωρείται κάτω τριγωνικός
        }

        if (!Array.isArray(matrix[0])) {
            // Μονοδιάστατος πίνακας
            return true; // Κάθε μονοδιάστατος πίνακας θεωρείται κάτω τριγωνικός
        }

        const n = matrix.length;
        for (let i = 0; i < n; i++) {
            if (Array.isArray(matrix[i][0])) {
                if (!this.isLowerTriangular(matrix[i])) {
                    return false;
                }
            } else {
                for (let j = i + 1; j < n; j++) {
                    if (matrix[i][j] !== 0) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    /**
     * Ελέγχει αν ένας πίνακας είναι αυστηρά κάτω τριγωνικός.
     *
     * @param {Array} matrix Ο πίνακας. Μπορεί να είναι μονοδιάστατος ή πολυδιάστατος.
     * @returns {boolean} True αν είναι αυστηρά κάτω τριγωνικός, false αλλιώς.
     * @static
     */
    static isStrictlyLowerTriangular(matrix) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        if (matrix.length === 0) {
            return true; // Κενός πίνακας θεωρείται άνω τριγωνικός
        }

        if (!Array.isArray(matrix[0])) {
            // Μονοδιάστατος πίνακας
            return true; // Κάθε μονοδιάστατος πίνακας θεωρείται άνω τριγωνικός
        }

        const n = matrix.length;
        for (let i = 0; i < n; i++) {
            if (Array.isArray(matrix[i][0])) {
                if (!this.isStrictlyLowerTriangular(matrix[i])) {
                    return false;
                }
            } else {
                for (let j = i + 1; j < n; j++) { // Σημείωση: j > i για αυστηρά κάτω τριγωνικό
                    if (matrix[i][j] !== 0) {
                        return false;
                    }
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

    /**
     * Ελέγχει αν ένας πίνακας είναι ορθογώνιος.
     * @param {Array} matrix Ο πίνακας προς έλεγχο.
     * @returns {boolean} True αν ο πίνακας είναι ορθογώνιος, false αλλιώς.
     * @static
     */
    static isOrthogonal(matrix) {
        if (!Array.isArray(matrix)) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }

        if (matrix.length === 0) {
            return true; // Κενός πίνακας θεωρείται ορθογώνιος
        }

        // Ελέγχουμε αν όλες οι γραμμές έχουν το ίδιο μήκος
        const cols = matrix[0].length;
        for (let i = 1; i < matrix.length; i++) {
            if (matrix[i].length !== cols) {
                return false;
            }
        }

        // Αν ο πίνακας είναι μονοδιάστατος, ελέγχουμε αν το μήκος του είναι 1
        if (!Array.isArray(matrix[0])) {
            return matrix.length === 1;
        }

        // Υπολογίζουμε το γινόμενο του πίνακα με τον μεταθεμένο του
        const transposed = this.transpose(matrix);
        const product = this.mult(matrix, transposed);

        // Ελέγχουμε αν το γινόμενο είναι η μονάδα
        const n = matrix.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === j && product[i][j] !== 1) {
                    return false;
                } else if (i !== j && product[i][j] !== 0) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Ελέγχει αν ένας δεδομένος δισδιάστατος πίνακας είναι τετραγωνικός.
     * Ένας πίνακας είναι τετραγωνικός όταν έχει τον ίδιο αριθμό γραμμών και στηλών.
     *
     * @param {Array<Array<number>>} matrix Ο πίνακας που θα ελεγχθεί.
     * @returns {boolean} True αν ο πίνακας είναι τετραγωνικός, false διαφορετικά.
     */
    static isSquareMatrix(matrix) {
        // Έλεγχος αν ο πίνακας είναι null ή undefined
        if (!matrix) {
        return false;
        }
    
        // Έλεγχος αν ο πίνακας είναι κενός
        if (matrix.length === 0) {
        return false;
        }
    
        // Αποθήκευση του μήκους της πρώτης γραμμής
        const rows = matrix.length;
        const cols = matrix[0].length;
    
        // Έλεγχος αν όλες οι γραμμές έχουν το ίδιο μήκος
        for (let i = 1; i < rows; i++) {
        if (matrix[i].length !== cols) {
            return false;
        }
        }
    
        return true;
    }

    /**
     * Διαχωρίζει έναν επαυξημένο πίνακα σε πίνακα συντελεστών και πίνακα σταθερών όρων.
     * @param {number[][]} augmentedMatrix Ο επαυξημένος πίνακας. Πρέπει να είναι ένας δισδιάστατος πίνακας αριθμών.
     * @returns {{coefficients: number[][], constants: number[][]}} Ένα αντικείμενο που περιέχει τον πίνακα συντελεστών και τον πίνακα σταθερών όρων.
     * @throws {Error} Εάν ο πίνακας εισόδου είναι κενός ή δεν είναι έγκυρος επαυξημένος πίνακας (λιγότερες από 2 στήλες).
     * @example
     * const augmentedMatrix = [
     *   [2, 1, 5],
     *   [1, -1, 1],
     * ];
     * const results = Matrix2d.separateAugmentedMatrix(augmentedMatrix);
     * console.log(results.coefficients); // [[2, 1], [1, -1]]
     * console.log(results.constants); // [[5], [1]]
     */
    static separateAugmentedMatrix(augmentedMatrix) {
        const numRows = augmentedMatrix.length;
      
        if (numRows === 0) {
            throw new Error("Ο πίνακας είναι κενός.");
        }
      
        const numCols = augmentedMatrix[0].length;
      
        if (numCols < 2) {
            throw new Error("Η είσοδος δεν είναι έγκυρος πίνακας.");
        }
      
        const coefficientMatrix = [];
        const constantsMatrix = [];
      
        for (let row = 0; row < numRows; row++) {
          coefficientMatrix[row] = [];
          constantsMatrix[row] = [];
      
          for (let col = 0; col < numCols - 1; col++) {
            coefficientMatrix[row][col] = augmentedMatrix[row][col];
          }
          constantsMatrix[row][0] = augmentedMatrix[row][numCols - 1];
        }
      
        return {
          coefficients: coefficientMatrix,
          constants: constantsMatrix,
        };
      }
}
export {Matrix2d};
