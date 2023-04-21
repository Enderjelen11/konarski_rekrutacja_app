#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::{CustomMenuItem, Menu, Submenu};

fn main() {
    let context = tauri::generate_context!();
    tauri::Builder::default()
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
