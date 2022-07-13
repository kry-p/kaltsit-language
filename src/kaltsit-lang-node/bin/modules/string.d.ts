export declare const stringify: (unicode: number) => string;
export declare const removeTargetString: (statement: string, target: string) => string;
export declare const removeAllDots: (statement: string) => string;
export declare const splitCommand: (statement: string, splitter: string) => string[];
export declare const checkOnlyDots: (statement: string) => boolean;
export declare const checkControlExists: (statement: string) => boolean;
export declare const checkCalc: (statement: string) => {
    calcExists: boolean;
    currentCalc: number;
};
export declare const calculateNumber: (numberString: string) => number;
