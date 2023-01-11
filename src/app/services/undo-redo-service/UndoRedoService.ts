import {PresentationType} from "../../OurTypes";

export interface IUndoRedoService {
    setInitialState(presentation: PresentationType): void;
    handlePresentationChange(presentation: PresentationType): void;
    isAnyToUndo(): boolean;
    isAnyToRedo(): boolean;
    makeUndo(): void;
    makeRedo(): void;
}

export class UndoRedoService implements IUndoRedoService {
    public presentationVariants: string[] = [];
    public currentVersion: number = -1;

    public readonly presentationUpdateFunction: (presentation: PresentationType) => void;

    constructor(presentationUpdateFunction: (presentation: PresentationType) => void ) {
        this.presentationUpdateFunction = presentationUpdateFunction;
    }

    handlePresentationChange(presentation: PresentationType): void {
        const presentationJson: string = JSON.stringify( presentation );
        this.presentationVariants.splice( this.currentVersion + 1 );
        this.presentationVariants.push( presentationJson );
        this.currentVersion++;
    }

    setInitialState(presentation: PresentationType): void {
        if ( this.currentVersion !== -1 ) return;

        this.handlePresentationChange( presentation );
    }

    makeRedo(): void {
        if ( !this.isAnyToRedo() ) return;

        const presentationJson: string = this.presentationVariants[++this.currentVersion];
        const presentation: PresentationType = JSON.parse( presentationJson );
        this.presentationUpdateFunction( presentation );
    }

    makeUndo(): void {
        if ( !this.isAnyToUndo() ) return;

        const presentationJson: string = this.presentationVariants[--this.currentVersion];
        const presentation: PresentationType = JSON.parse( presentationJson );
        this.presentationUpdateFunction( presentation );
    }

    isAnyToRedo(): boolean {
        return this.currentVersion < this.presentationVariants.length - 1;
    }

    isAnyToUndo(): boolean {
        return this.currentVersion > 0;
    }
}
