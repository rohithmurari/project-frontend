import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

// declare var CodeMirror: any;
declare const monaco: any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements AfterViewInit{
  // code: string = ''; // The variable to bind the editor's content

  // editorOptions = {
  //   theme: 'monokai', // Specify the editor theme (e.g., 'monokai', 'github', 'tomorrow')
  //   mode: 'javascript', // Specify the language mode for syntax highlighting
  //   // Additional options as needed (e.g., readOnly, fontSize, etc.)
  // };
  // @ViewChild('codeMirrorRef') codeMirrorRef!: ElementRef;

  // constructor(){}
  // ngAfterViewInit(): void {
  //   const editor = CodeMirror(this.codeMirrorRef.nativeElement, {
  //     value: '',
  //     mode: 'javascript',
  //     lineNumbers: true,
  //     // Other options as needed
  //   });
  //   editor.on('change', () => {
  //     console.log(editor.getValue()); // Retrieve the editor content
  //   });
  // }
  @ViewChild('editorContainer') editorContainer!: ElementRef;

  ngAfterViewInit(): void {
    monaco.editor.create(this.editorContainer.nativeElement, {
      value: 'console.log("Hello, Monaco Editor!");',
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true
    });
  }
}

