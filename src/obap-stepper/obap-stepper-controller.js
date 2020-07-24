/*
@license
Copyright (c) 2020 Paul H Mason. All rights reserved.
*/
export const ObapStepperController = (superClass) =>
    class ObapStepperControllerComponent extends superClass {
        static get properties() {
            return {
                linear: {
                    type: Boolean,
                    attribute: 'linear'
                },

                canCancel: {
                    type: Boolean,
                    attribute: 'can-cancel'
                },

                selected: {
                    type: Number,
                    attribute: 'selected',
                    reflect: true
                },

                steps: {
                    type: Array
                },

                optionalText: {
                    type: String,
                    attribute: 'optional-text'
                },

                backText: {
                    type: String,
                    attribute: 'back-text'
                },

                cancelText: {
                    type: String,
                    attribute: 'cancel-text'
                },

                continueText: {
                    type: String,
                    attribute: 'continue-text'
                },

                finishText: {
                    type: String,
                    attribute: 'finish-text'
                },

                errorText: {
                    type: String,
                    attribute: 'error-text'
                },

                // top (default), bottom, left, right
                summaryPosition: {
                    type: String,
                    attribute: 'summary-position'
                },

                disabledSteps: {
                    type: Array
                },
            }
        }

        constructor() {
            super();
            this._boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this);
            this._boundStepperStepStateChangeEvent = this._handleStepperStepStateChangeEvent.bind(this);
            this.linear = false;
            this.canCancel = true;
            this.selected = -1;
            this.steps = [];
            this.disabledSteps = [];
            this.optionalText = 'Optional';
            this.backText = 'Back';
            this.cancelText = 'Cancel';
            this.continueText = 'Continue';
            this.finishText = 'Finish';
            this.errorText = 'Error';
            this.summaryPosition = 'top';
            this.hasCustomIcons = false;
            this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
            this.renderRoot.addEventListener('obap-stepper-step-state-change', this._boundStepperStepStateChangeEvent);
        }

        updated(changedProperties) {
            super.updated(changedProperties);

            changedProperties.forEach((oldValue, propName) => {
                if (propName === 'disabled') {
                    this._updateSteps();
                }
            });
        }

        canSetStep(newStepIndex, oldStepIndex, newStepName, oldStepName) {
            return this.fireMessage('obap-stepper-step-can-change', {
                newStepIndex: newStepIndex,
                oldStepIndex: oldStepIndex,
                newStepName: newStepName,
                oldStepName: oldStepName
            }, true);
        }

        setStep(index) {
            if (index === this.selected) {
                return false;
            }

            const newStepIndex = index;

            if (!this.steps[newStepIndex].selectable) return false;
            
            const newStepName = this.steps[newStepIndex].name;
            const oldStepIndex = this.selected;
            let oldStepName = '';

            if (oldStepIndex > -1) {
                oldStepName = this.steps[oldStepIndex].name;
            }

            if (!this.canSetStep(newStepIndex, oldStepIndex, newStepName, oldStepName)) {
                return false;
            }

            this.steps.forEach((step, idx) => {
                if (index === idx) {
                    step.selected = true;
                    step.visited = true;
                } else {
                    step.selected = false;
                }
            });

            this._updateSteps();
            this.selected = index;

            this.fireMessage('obap-stepper-step-change', {
                newStepIndex: newStepIndex,
                oldStepIndex: oldStepIndex,
                newStepName: newStepName,
                oldStepName: oldStepName
            });

            return true;
        }

        getStep(index) {
            if ((index >= 0) && (index <= this.steps.length - 1)) {
                return this.steps[index];
            }

            return null;
        }

        nextStep() {
            let index = this.selected;

            if (index < this.steps.length - 1) {
                let newIndex = index + 1;
                let newStep = this.getStep(newIndex);

                while ((newStep !== null) && (!newStep.selectable)) {
                    newIndex = newIndex + 1;
                    newStep = this.getStep(newIndex);
                }

                if (newStep !== null) {
                    this.setStep(newIndex);
                }
            }
        }

        previousStep() {
            let index = this.selected;

            if (index > 0) {
                let newIndex = index - 1;
                let newStep = this.getStep(newIndex);

                while ((newStep !== null) && (!newStep.selectable)) {
                    newIndex = newIndex - 1;
                    newStep = this.getStep(newIndex);
                }

                if (newStep !== null) {
                    this.setStep(newIndex);
                }
            }
        }

        cancel() {
            this.steps.forEach((step) => {
                step.visited = false;
                step.error = false;
            });

            this._updateSteps();

            this.setStep(0);
            this.fireMessage('obap-stepper-cancel', { index: this.selected });
        }

        finish() {
            if (this.canFinish()) {
                this.fireMessage('obap-stepper-finish', { index: this.selected });
                return true;
            }
            
            return false;
        }

        canMoveBack() {
            for (let i = 0; i < this.selected; i++) {
                if (this.steps[i].selectable) return true;
            }

            return false;
        }

        canMoveForward() {
            for (let i = this.selected + 1; i < this.steps.length; i++) {
                if (this.steps[i].selectable) return true;
            }

            return false; 
        }

        canFinish() {
            let visitedCount = 0;
            let optionalCount = 0;
            let errorCount = 0;

            this.steps.forEach((step) => {
                if (step.error) errorCount++;
                if (step.optional && !step.visited) optionalCount++;
                if (step.visited) visitedCount++;
            });

            return (errorCount === 0) && ((visitedCount + optionalCount) === this.steps.length);
        }

        _updateSteps() {
            this.steps.forEach((step, index) => {
                step.disabled = this.disabled || (this.linear && !step.visited);

                if (step.icon) {
                    this.hasCustomIcons = true;
                }
            });

            this.requestUpdate();
        }

        _handleSlotChangeEvent(e) {
            let slot = this.renderRoot.querySelector('slot[name="step"]');

            if (!slot) {
                return;
            }

            const disabledState = this.disabled;

            const nodes = slot.assignedNodes({ flatten: true }).filter((el) => {
                return ((el.nodeType === 1) && (el.tagName === 'OBAP-STEPPER-STEP'));
            });

            this.steps = nodes;

            if (this.steps.length > 0) {
                this.setStep(0);
            }

            this._updateSteps();
        }

        _handleStepperStepStateChangeEvent(e) {
            // Force an update if a step error state changes.
            if ((e.detail.props.length === 1) && (e.detail.props.indexOf('error') > -1)) {
                this.requestUpdate();
            }
        }
    };