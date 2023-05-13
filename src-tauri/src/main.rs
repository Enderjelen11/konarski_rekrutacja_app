#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, Submenu};
use std::fs;
use serde::Deserialize;

#[derive(Debug, Deserialize)]
struct contents {
    sequence: Vec<u16>,
}

#[tauri::command]
fn save_file(contents: contents, path: String) {
    let text: String = contents.sequence.iter()
        .map(|&c| char::from_u32(u32::from(c)).unwrap_or('?'))
        .collect();
    
    fs::write(path, text).unwrap();
}

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_file])
        .menu(
            Menu::new().add_submenu(Submenu::new(
                "Plik",
                Menu::new()
                    .add_item(CustomMenuItem::new("open", "Otwórz").accelerator("cmdOrControl+O"))
                    .add_item(CustomMenuItem::new("save", "Zapisz").accelerator("cmdOrControl+S"))
                    .add_item(CustomMenuItem::new("close", "Zamknij").accelerator("cmdOrControl+Q")),
            )),
        )
        .on_menu_event(|event| match event.menu_item_id() {
            "save" => {
                let _ = event.window().emit("menu-event", "save-event").unwrap();
                // success
            }
            "open" => {
                let _ = event.window().emit("menu-event", "open-event").unwrap();
                // success
            }
            "close" => {
                event.window().close().unwrap();
            }
            _ => {}
        })
        .run(context)
        .expect("error while running tauri application");
}



