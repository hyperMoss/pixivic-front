/*
* MIT License

 Copyright (c) 2018 Weijia Wang

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE. */
import Section from './Section';

const SECTION_SIZE = 600;

export default class SectionManager {
  constructor(sectionSize = SECTION_SIZE) {
    this._sectionSize = sectionSize;

    this._cellMetadata = [];
    this._sections = {};
  }

  registerCell({ cellMetadatum, index }) {
    const frozenCellMetadatum = Object.freeze(cellMetadatum);
    this._cellMetadata[index] = frozenCellMetadatum;

    this.getSections(frozenCellMetadatum).forEach((section) => section.addCellIndex({ index }));
  }

  freezeCells() {
    Object.freeze(this._cellMetadata);
  }

  /** Get all Sections overlapping the specified region. */
  getSections({
    height, width, x, y,
  }) {
    const sectionXStart = Math.floor(x / this._sectionSize);
    const sectionXStop = Math.floor((x + width - 1) / this._sectionSize);
    const sectionYStart = Math.floor(y / this._sectionSize);
    const sectionYStop = Math.floor((y + height - 1) / this._sectionSize);

    const sections = [];

    for (let sectionX = sectionXStart; sectionX <= sectionXStop; sectionX++) {
      for (let sectionY = sectionYStart; sectionY <= sectionYStop; sectionY++) {
        const key = `${sectionX}.${sectionY}`;

        if (!this._sections[key]) {
          this._sections[key] = new Section({
            height: this._sectionSize,
            width: this._sectionSize,
            x: sectionX * this._sectionSize,
            y: sectionY * this._sectionSize,
          });
        }

        sections.push(this._sections[key]);
      }
    }

    return sections;
  }

  /** Total number of Sections based on the currently registered cells. */
  getTotalSectionCount() {
    return Object.keys(this._sections).length;
  }

  /**
     * Gets all cell indices contained in the specified region.
     * A region may encompass 1 or more Sections.
     */
  getCellIndices({
    height, width, x, y,
  }) {
    const indices = {};

    this.getSections({
      height, width, x, y,
    }).forEach((section) => section.getCellIndices().forEach((index) => {
      indices[index] = index;
    }));

    // Object keys are strings; this function returns numbers
    return Object.keys(indices).map((index) => indices[index]);
  }

  getCellMetadata(index) {
    return this._cellMetadata[index];
  }
}
